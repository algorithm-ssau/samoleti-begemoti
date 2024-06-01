from flask import Blueprint, jsonify
import pymongo
from config import DevelopmentConfig
from bson.objectid import ObjectId

hotel_booking_blueprint = Blueprint('hotel_booking_blueprint', __name__,
                        template_folder='templates')

client = pymongo.MongoClient(DevelopmentConfig.MONGO_DB_URL)
db = client[DevelopmentConfig.MONGO_DOCUMENT]

#@jwt_required()
@hotel_booking_blueprint.route('/hotelbooking/<booking_id>/cancel', methods=['POST'])
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