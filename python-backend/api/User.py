from flask import Blueprint, jsonify, json
import pymongo
from config import DevelopmentConfig
from bson.objectid import ObjectId
from bson import json_util

user_api_blueprint = Blueprint('user_api_blueprint', __name__, template_folder='templates')

client = pymongo.MongoClient(DevelopmentConfig.MONGO_DB_URL)
db = client[DevelopmentConfig.MONGO_DOCUMENT]


@user_api_blueprint.route('/profile/transactions', methods=['GET'])
def get_transactions():
    # Настроенный для примера фиксированный user_id, в реальном случае его следует получать из JWT
    user_id = "665a05c03e0db8860252e47c"  # или user_id = get_jwt_identity()['id'], если используете JWT

    # Ищем пользователя в базе данных по его ObjectId
    user = db['users'].find_one({"_id": ObjectId(user_id)})
    # Если пользователь не найден, возвращаем ошибку 404
    if not user:
        return jsonify({"error": "Пользователь не найден USER"}), 404

    try:
        # Находим все транзакции для данного пользователя
        transactions = db["accounttransaction"].find({"user": ObjectId(user_id)})
        print('123123')
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
        return jsonify({"error": f"Внутрення ошибка сервера: {e}"}), 500

#@jwt_required()
# Маршрут для получения истории бронирований пользователя
@user_api_blueprint.route('/profile/bookings')
def get_bookings():
    # Настроенный для примера фиксированный user_id, в реальном случае его следует получать из JWT
    user_id = "665a05c03e0db8860252e47c"  # или user_id = get_jwt_identity()['id'], если используете JWT

    try:
        # Ищем пользователя в базе данных по его ObjectId
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        print(db['users'].find_one({"_id": ObjectId(user_id)}))
        # Если пользователь не найден, возвращаем ошибку 404
        if not user:
            return jsonify({"error": "Пользователь не найден USER"}), 404

        # Получаем список истории бронирований пользователя
        hotel_history_list = user.get("hotelHistory", [])
        # Если список пуст, возвращаем ошибку 404
        if not hotel_history_list:
            return jsonify({"error": "История забронированных отелей для пользователя не найдена HISTORY"}), 404

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
                print(f"Ошибка нахождения отеля по id комнаты HOTEL: {e}")

            # Если отель не найден, возвращаем ошибку 404
            if not hotel:
                return jsonify({"error": "Отель не найден HOTEL"}), 404

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
        return jsonify({"error": f"Внутрення ошибка сервера: {e}"}), 500