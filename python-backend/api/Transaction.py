from flask import Blueprint, request, jsonify
import pymongo
from config import DevelopmentConfig
from datetime import datetime
from bson.objectid import ObjectId

transaction_blueprint = Blueprint('transaction_blueprint', __name__,
                        template_folder='templates')

client = pymongo.MongoClient(DevelopmentConfig.MONGO_DB_URL)
db = client[DevelopmentConfig.MONGO_DOCUMENT]

@transaction_blueprint.route('/profile/money', methods=['POST'])
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

@transaction_blueprint.route('/pay_for_booking/<booking_id>', methods=['POST'])
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