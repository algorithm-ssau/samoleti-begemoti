class Config(object):
    DEBUG = False
    TESTING = False
    # Mongo config
    MONGO_DB_URL = "mongodb://localhost:27017/"
    MONGO_DOCUMENT = 'SamoletiBegemoti'


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000
    # JWT config
    JWT_SECRET_KEY = 'ldjhkmvsdlkskeddssd'
    JWT_IDENTITY_CLAIM = 'user_id'
    # Mongo config
    MONGO_DB_URL = "mongodb://localhost:27017/"
    MONGO_DOCUMENT = 'tests'
    # UPLOAD_PHOTOS_RELATIVE = '/uploads'
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}


class TestingConfig(Config):
    TESTING = True
