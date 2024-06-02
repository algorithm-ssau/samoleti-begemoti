from flask import Flask
import pymongo
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager
from api.HotelBooking import hotel_booking_blueprint
from api.Transaction import transaction_blueprint
from api.User import user_api_blueprint

load_dotenv()

app = Flask(__name__)
# app.config.from_object("config.DevelopmentConfig")

app.register_blueprint(hotel_booking_blueprint)
app.register_blueprint(transaction_blueprint)
app.register_blueprint(user_api_blueprint)
# print(os.getenv('MONGO_DB_URL'))
# client = pymongo.MongoClient(app.config['MONGO_DB_URL'])
# db = client[app.config['MONGO_DOCUMENT']]
client = pymongo.MongoClient(os.getenv('MONGO_DB_URL'))
db = client[os.getenv('MONGO_DOCUMENT')]

jwt = JWTManager(app)


if __name__ == "__main__":
    try:
        client.admin.command('ping')
        print("Проверено ваше развертывание. Вы успешно подключились к MongoDB!")
    except Exception as e:
        print(e)
    app.run(debug=True)
