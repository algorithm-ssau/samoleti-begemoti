from datetime import datetime

from flask import Flask, request, jsonify, json
import pymongo
from bson.objectid import ObjectId
from bson import json_util
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config.from_object("config.DevelopmentConfig")

client = pymongo.MongoClient(app.config['MONGO_DB_URL'])
db = client[app.config['MONGO_DOCUMENT']]

# jwt = JWTManager(app)


@app.route('/profile/money', methods=['POST'])
def add_money():
    # Предполагается, что user_id получен из JWT или другого источника
    user_id = "665a05c03e0db8860252e47c"  # или get_jwt_identity()['id'], если используете JWT

    amount_to_add = request.json.get("amount")  # Сумма для пополнения

    if not user_id or amount_to_add is None:
        return jsonify({"error": "Missing userId or amount"}), 400

    # Преобразование суммы пополнения в число
    try:
        amount_to_add = int(amount_to_add)
    except ValueError:
        return jsonify({"error": "Invalid amount format"}), 400

    # Находим аккаунт пользователя
    user = db['users'].find_one({"_id": ObjectId(user_id)})
    if not user or "account" not in user:
        return jsonify({"error": "User or account not found"}), 404

    account = db["bankaccount"].find_one({"_id": user["account"]})
    if not account:
        return jsonify({"error": "Account not found"}), 404
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

    return jsonify({"message": "Account successfully recharged", "new_balance": new_amount}), 200

@app.route('/pay_for_booking/<booking_id>', methods=['POST'])
def pay_for_booking(booking_id):
    # Предполагается, что user_id получен из JWT или другого источника
    user_id = "665a05c03e0db8860252e47c"  # или get_jwt_identity()['id'], если используете JWT

    # Находим пользователя и проверяем, включено ли бронирование в его историю
    user = db['users'].find_one({"_id": ObjectId(user_id)})

    # Поиск брони по идентификатору
    booking = db["hotelbookings"].find_one({"_id": ObjectId(booking_id)})
    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    # Поиск комнаты, чтобы узнать ее стоимость
    room = db["rooms"].find_one({"_id": booking["room"]})
    if not room:
        return jsonify({"error": "Room not found"}), 404

    # # Поиск пользователя, который сделал бронь
    # user = db["users"].find_one({"hotelHistory": {"$elemMatch": {"$oid": booking_id}}})
    # if not user:
    #     return jsonify({"error": "User not found"}), 404

    # Поиск банковского аккаунта пользователя
    account = db["bankaccount"].find_one({"_id": user["account"]})
    if not account:
        return jsonify({"error": "Account not found"}), 404

    # Проверка, достаточно ли денег на счету для оплаты
    if int(account["amount"]["$numberLong"]) < room["price"]:
        return jsonify({"error": "Insufficient funds"}), 400

    # Создание транзакции
    transaction = {
        "user": user["_id"],
        "date": datetime.now(),
        "amount": -room["price"],  # Сумма списания
        "description": f"Payment for booking {booking_id}"
    }
    db["accounttransaction"].insert_one(transaction)

    # Обновление счета пользователя
    new_amount = int(account["amount"]["$numberLong"]) - room["price"]
    db["bankaccount"].update_one(
        {"_id": account["_id"]},
        {"$set": {"amount": {"$numberLong": str(new_amount)}}}
    )

    # Обновление статуса брони на "paid"
    db["hotelbookings"].update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": "paid"}}
    )

    return jsonify({"message": "Booking successfully paid"}), 200

#@jwt_required()
@app.route('/hotelbooking/<booking_id>/cancel', methods=['POST'])
def cancel_reservation(booking_id):
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = "665a05c03e0db8860252e47c"  # или get_jwt_identity()['id'], если используете JWT

        # Находим пользователя и проверяем, включено ли бронирование в его историю
        user = db['users'].find_one({"_id": ObjectId(user_id)})

        # booking_id_str = str(booking_id)  # Преобразуем ObjectId в строку
        # if not user or booking_id_str not in [h['$oid'] for h in user.get('hotelHistory', [])]:
        #     return jsonify({"error": "No rights to cancel this booking"}), 403
        print('sadasdasd')
        # Находим запись бронирования
        hotel_book = db['hotelbookings'].find_one({"_id": ObjectId(booking_id)})
        if not hotel_book:
            return jsonify({"error": "Бронирование не найдено"}), 404

        # Обновляем статус бронирования на "cancelled"
        result = db['hotelbookings'].update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"status": "cancelled"}}
        )

        # Проверяем, что обновление прошло успешно
        if result.matched_count:
            return jsonify({"message": "Бронирование отменено"}), 200
        else:
            return jsonify({"error": "Не удалось обновить бронирование"}), 500

    except pymongo.errors.PyMongoError as e:
        # Обработка любых ошибок связанных с MongoDB
        return jsonify({"error": f"Ошибка базы данных: {e}"}), 500
    except Exception as e:
        # Обработка прочих ошибок
        return jsonify({"error": f"Внутренняя ошибка сервера: {e}"}), 500

#@jwt_required()
# Маршрут для получения истории бронирований пользователя
@app.route('/profile/bookings')
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


if __name__ == "__main__":
    try:
        client.admin.command('ping')
        print("Проверено ваше развертывание. Вы успешно подключились к MongoDB!")
    except Exception as e:
        print(e)
    app.run(debug=True)
