from flask import Blueprint, jsonify
import pymongo
from config import DevelopmentConfig
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity

hotel_booking_blueprint = Blueprint('hotel_booking_blueprint', __name__,
                        template_folder='templates')

load_dotenv()
print(os.getenv('MONGO_DB_URL'))

client = pymongo.MongoClient(os.getenv('MONGO_DB_URL'))
db = client[os.getenv('MONGO_DOCUMENT')]


@hotel_booking_blueprint.route('/hotelbooking/<booking_id>/cancel', methods=['POST'])
@jwt_required()  # Требуется JWT
def cancel_reservation(booking_id):
    try:
        # Предполагается, что user_id получен из JWT или другого источника
        user_id = get_jwt_identity()
        print(user_id)
        # Находим пользователя и проверяем, включено ли бронирование в его историю
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "Отмена доступа"}), 403
        # booking_id_str = str(booking_id)  # Преобразуем ObjectId в строку
        # if not user or booking_id_str not in [h['$oid'] for h in user.get('hotelHistory', [])]:
        #     return jsonify({"error": "No rights to cancel this booking"}), 403

        # Находим запись бронирования
        hotel_book = db['hotelbookings'].find_one({"_id": ObjectId(booking_id)})
        if not hotel_book:
            return jsonify({"error": "Бронирование не найдено"}), 404

        # Обновляем статус бронирования на "cancelled"
        result = db['hotelbookings'].update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"status": "Cancelled"}}
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