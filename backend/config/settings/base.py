from pathlib import Path
import os

from django.template.context_processors import media

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    'jazzmin',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_cleanup.apps.CleanupConfig",
    'rest_framework',
    "corsheaders",
    'django_ckeditor_5',
    'content_list.partners',
    'our_projects',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / 'templates']
        ,
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "ru"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
MEDIA_URL = os.getenv('MEDIA_URL', '/media/')
MEDIA_ROOT = '/app/media'

STATIC_URL = '/static/'

STATIC_ROOT = '/app/static'

CKEDITOR_UPLOAD_PATH = os.getenv('CKEDITOR_UPLOAD_PATH')

CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": [
            "heading", "|",
            "bold", "italic", "underline", "link", "|",
            "bulletedList", "numberedList", "|",
            "imageUpload", "mediaEmbed", "insertTable", "|",
            "undo", "redo"
        ],
        "language": "ru",
    }
}

JAZZMIN_SETTINGS = {
    "site_title": "Lezgian Admin",
    "site_header": "Lezgian Website Admin",
    "site_brand": "Lezgian",
    "welcome_sign": "Добро пожаловать!",
    "copyright": "Lezgian Development",
    "search_model": ["auth.User", "yourapp.YourModel"],  # если хочешь поиск

    # Темы
    "theme": "cyborg",  # 👈 тёмная тема (или "flatly", "darkly", "lux" и др.)

    # Sidebar
    "show_sidebar": True,
    "navigation_expanded": True,
    "icons": {
        "auth.User": "fas fa-user",
        "auth.Group": "fas fa-users",
        # Добавь иконки для своих моделей
    },
}
