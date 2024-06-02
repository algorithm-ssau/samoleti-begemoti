import os
from datetime import datetime
import pymongo
from bson import json_util
from bson.objectid import ObjectId
from dotenv import load_dotenv
from flask import Blueprint, jsonify, json, request
from flask_jwt_extended import jwt_required, get_jwt_identity

user_api_blueprint = Blueprint('user_api_blueprint', __name__, template_folder='templates')

load_dotenv()

client = pymongo.MongoClient(os.getenv('MONGO_DB_URL'))
db = client[os.getenv('MONGO_DOCUMENT')]


@user_api_blueprint.route('/profile/money', methods=['POST'])
@jwt_required()  # Требуется JWT
def add_money():
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = get_jwt_identity()
        print(user_id)

        # Сумма для пополнения
        amount_to_add = request.json.get("amount")

        if amount_to_add is None:
            return jsonify({"error": "Missing amount"}), 400

        # Преобразование суммы пополнения в число
        try:
            amount_to_add = int(amount_to_add)
        except ValueError:
            return jsonify({"error": "Invalid amount format"}), 400

        # Находим пользователя
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Находим аккаунт пользователя
        account = db["bankaccount"].find_one({"_id": user["account"]})
        if not account:
            return jsonify({"error": "BankAccount not found"}), 404
        print(account["amount"])

        # Обновляем баланс аккаунта
        new_amount = int(account["amount"]["$numberLong"]) + amount_to_add
        db["bankaccount"].update_one(
            {"_id": account["_id"]},
            {"$set": {"amount": {"$numberLong": str(new_amount)}}}
        )

        # Создаем транзакцию
        transaction = {
            "user": user["_id"],
            "date": datetime.now(),
            "amount": amount_to_add,  # Сумма пополнения
            "description": "Account recharge"
        }
        db["accounttransaction"].insert_one(transaction)

        # return jsonify({"message": "Account successfully recharged", "new_balance": new_amount}), 200
        return jsonify(transaction), 200
    except Exception as e:
        # Любые другие ошибки отлавливаются здесь и возвращается ошибка 500
        return jsonify({"error": f"Internal server error: {e}"}), 500


@user_api_blueprint.route('/profile/transactions', methods=['GET'])
@jwt_required()  # Требуется JWT
def get_transactions():
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = get_jwt_identity()
        print(user_id)

        # Ищем пользователя в базе данных по его ObjectId
        user = db['users'].find_one({"_id": ObjectId(user_id)})

        # Если пользователь не найден, возвращаем ошибку 404
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Находим все транзакции для данного пользователя
        transactions = db["accounttransaction"].find({"user": ObjectId(user_id)})

        # Преобразуем транзакции в список для удобной передачи в JSON
        transactions_list = []

        for transaction in transactions:
            transaction['_id'] = str(transaction['_id'])  # Преобразовываем ObjectId в строку
            transaction['user'] = str(transaction['user'])  # Преобразовываем ObjectId в строку

            if 'date' in transaction:
                transaction['date'] = transaction['date'].isoformat()  # Преобразовываем дату в строку

            transactions_list.append(transaction)

        return jsonify(transactions_list), 200
    except Exception as e:
        # Любые другие ошибки отлавливаются здесь и возвращается ошибка 500
        return jsonify({"error": f"Internal server error: {e}"}), 500


# Маршрут для получения истории бронирований пользователя
@user_api_blueprint.route('/profile/bookings')
@jwt_required()  # Требуется JWT
def get_bookings():
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = get_jwt_identity()
        print(user_id)

        # Ищем пользователя в базе данных по его ObjectId
        user = db['users'].find_one({"_id": ObjectId(user_id)})

        # Если пользователь не найден, возвращаем ошибку 404
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Получаем список истории бронирований пользователя
        hotel_history_list = user.get("hotelHistory", [])

        books = []  # Список для хранения информации о бронированиях

        # Проходимся по списку истории бронирований
        for booking_id in hotel_history_list:
            # Ищем каждое бронирование по его ObjectId
            booking = db['hotelbookings'].find_one({"_id": ObjectId(booking_id)})

            # Пропускаем, если бронирование не найдено
            if not booking:
                continue

            # Пытаемся найти отель, в котором было сделано бронирование
            try:
                hotel = db['hotels'].find_one({"rooms": {"$elemMatch": {"$eq": ObjectId(booking['room'])}}})
            except Exception as e:
                print(f"Ошибка нахождения отеля по id комнаты: {e}")

            # Если отель не найден, возвращаем ошибку 404
            if not hotel:
                return jsonify({"error": "Hotel not found"}), 404

            # Форматируем данные бронирования для вывода
            booking['_id'] = str(booking['_id'])
            booking['hotelId'] = str(hotel['_id'])
            booking['roomId'] = str(booking['room'])
            booking['dateFrom'] = booking.pop('dateStart')
            booking['dateTo'] = booking.pop('dateEnd')

            # Удаляем ненужное поле 'room'
            booking.pop('room')

            # Добавляем отформатированное бронирование в список
            books.append(booking)

        # Сериализуем данные в JSON и возвращаем ответ
        response = json.loads(json_util.dumps(books))
        return jsonify(response)

    except Exception as e:
        # Любые другие ошибки отлавливаются здесь и возвращается ошибка 500
        return jsonify({"error": f"Internal server error: {e}"}), 500
