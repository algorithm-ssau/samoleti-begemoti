class Config(object):
    DEBUG = False
    TESTING = False
    MONGO_DB_URI = "mongodb://localhost:27017/"


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000

    # UPLOAD_PHOTOS_RELATIVE = '/uploads'
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}


class TestingConfig(Config):
    TESTING = True
