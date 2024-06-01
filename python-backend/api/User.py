from flask import Blueprint, json, current_app
import jwt
from bson.objectid import ObjectId
from bson import json_util
from config import DevelopmentConfig
import pymongo

user_api_blueprint = Blueprint('user_api_blueprint', __name__, template_folder='templates')

client = pymongo.MongoClient(DevelopmentConfig.MONGO_DB_URL)
db = client[DevelopmentConfig.MONGO_DOCUMENT]

def decode_auth_token(auth_token):
    """
    Декодирование АУФ-токена
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'