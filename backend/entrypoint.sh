#!/bin/bash

echo "Migrates"
python manage.py migrate

echo "Creating superuser if none exists..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
username = '$DJANGO_SUPERUSER_USERNAME'
email = '$DJANGO_SUPERUSER_EMAIL'
password = '$DJANGO_SUPERUSER_PASSWORD'
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'Superuser \"{username}\" created successfully.')
else:
    print(f'Superuser \"{username}\" already exists.')
" && echo "Superuser creation completed."

echo "Collecting static files..."
python manage.py collectstatic --noinput





echo "Running server..."
exec "$@"