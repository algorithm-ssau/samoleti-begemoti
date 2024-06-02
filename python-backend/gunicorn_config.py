import os

# Сначала мы настроим сервер Gunicorn, создав новый файл с именем gunicorn_config.py,
# где мы настроим такие параметры, как количество процессов и потоков, а также открытый
# порт или время ожидания.

workers = int(os.environ.get('GUNICORN_PROCESSES', '2'))

threads = int(os.environ.get('GUNICORN_THREADS', '4'))

# timeout = int(os.environ.get('GUNICORN_TIMEOUT', '120'))

bind = os.environ.get('GUNICORN_BIND', '0.0.0.0:8080')

forwarded_allow_ips = '*'

secure_scheme_headers = { 'X-Forwarded-Proto': 'https' }