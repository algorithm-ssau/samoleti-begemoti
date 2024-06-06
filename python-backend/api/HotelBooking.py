import os
from datetime import datetime
import pymongo
from bson.objectid import ObjectId
from bson.json_util import dumps
from dotenv import load_dotenv
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

hotel_booking_blueprint = Blueprint('hotel_booking_blueprint', __name__,
                                    template_folder='templates')

load_dotenv()
print(os.getenv('MONGO_DB_URL'))

client = pymongo.MongoClient(os.getenv('MONGO_DB_URL'))
db = client[os.getenv('MONGO_DOCUMENT')]


@hotel_booking_blueprint.route('/hotelbooking/<booking_id>/pay', methods=['POST'])
@jwt_required()  # Требуется JWT
def pay_for_booking(booking_id):
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = get_jwt_identity()
        print(user_id)

        # Находим пользователя
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        # НУЖНО ПРОВЕРИТЬ ЧТО БРОНЬ ПРИНАДЛЕЖИТ ЕМУ

        # Поиск брони по идентификатору
        booking = db["hotelbookings"].find_one({"_id": ObjectId(booking_id)})
        if not booking:
            return jsonify({"error": "HotelBooking not found"}), 404

        # Поиск комнаты, чтобы узнать ее стоимость
        room = db["rooms"].find_one({"_id": booking["room"]})
        if not room:
            return jsonify({"error": "Room not found"}), 404

        # Поиск банковского аккаунта пользователя
        account = db["bankaccount"].find_one({"_id": user["account"]})
        if not account:
            return jsonify({"error": "BankAccount not found"}), 404

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
        transaction_result = db["accounttransaction"].insert_one(transaction)
        transaction_id = transaction_result.inserted_id  # Получаем _id новой транзакции

        # Обновление счета пользователя
        new_amount = int(account["amount"]["$numberLong"]) - room["price"]
        db["bankaccount"].update_one(
            {"_id": account["_id"]},
            {"$set": {"amount": {"$numberLong": str(new_amount)}},
             "$push": {"transactions": transaction_id}  # Добавляем _id транзакции
            }
        )

        # Обновление статуса брони на "paid"
        db["hotelbookings"].update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"status": "paid", "fixedPrice": room["price"]}}
        )

        response = db["hotelbookings"].find_one({"_id": ObjectId(booking_id)})
        # Преобразуем данные в желаемый формат JSON
        booking = {
            "_id": str(response["_id"]),
            "dateFrom": response["dateStart"].isoformat() if response.get("dateStart") else None,
            "dateTo": response["dateEnd"].isoformat() if response.get("dateEnd") else None,
            "hotelId": str(response["room"]),  # Предполагается, что это поле содержит идентификатор гостиницы
            "roomId": str(response["room"]),  # Предполагается, что это поле содержит идентификатор комнаты
            "status": response["status"],
            "fixedPrice": response['fixedPrice']
        }
        # return jsonify({"message": "Booking successfully paid"}), 200
        return jsonify(booking), 200
    except Exception as e:
        # Любые другие ошибки отлавливаются здесь и возвращается ошибка 500
        return jsonify({"error": f"Internal server error: {e}"}), 500


@hotel_booking_blueprint.route('/hotelbooking/<booking_id>/status/cancel', methods=['POST'])
@jwt_required()  # Требуется JWT
def cancel_reservation(booking_id):
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = get_jwt_identity()
        print(user_id)

        # Находим пользователя и проверяем, включено ли бронирование в его историю
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # booking_id_str = str(booking_id)  # Преобразуем ObjectId в строку
        # if not user or booking_id_str not in [h['$oid'] for h in user.get('hotelHistory', [])]:
        #     return jsonify({"error": "No rights to cancel this booking"}), 403

        # Находим запись бронирования
        hotel_book = db['hotelbookings'].find_one({"_id": ObjectId(booking_id)})
        if not hotel_book:
            return jsonify({"error": "HotelBooking not found"}), 404

        # Обновляем статус бронирования на "cancelled"
        result = db['hotelbookings'].update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"status": "cancelled"}}
        )

        response = db['hotelbookings'].find_one({"_id": ObjectId(booking_id)})

        print(response)
        # Проверяем, что обновление прошло успешно
        if result.matched_count:
            # Преобразуем данные в желаемый формат JSON
            booking = {
                "_id": str(response["_id"]),
                "dateFrom": response["dateStart"].isoformat() if response.get("dateStart") else None,
                "dateTo": response["dateEnd"].isoformat() if response.get("dateEnd") else None,
                "hotelId": str(response["room"]),  # Предполагается, что это поле содержит идентификатор гостиницы
                "roomId": str(response["room"]),  # Предполагается, что это поле содержит идентификатор комнаты
                "status": response["status"]
            }
            return jsonify(booking), 200
        else:
            return jsonify({"error": "HotelBooking not updated"}), 500
    except Exception as e:
        # Обработка прочих ошибок
        return jsonify({"error": f"Internal server error: {e}"}), 500
