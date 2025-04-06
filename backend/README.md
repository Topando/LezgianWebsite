# Сайт Лезгинских танцев
***
## Описание архитектуры эндпоинта
***
### GET /partners-gallery

Возвращает массив данных о компаниях-партнёрах, включая их логотипы и ссылки. Предназначено для отображения блока “Наши партнёры” на лендинге или где там ещё дизайнер нарисовал эти 12 логотипов в ряд.
#### Структура ответа
```json
[
    {
        "id": 1,
        "name": "Google",
        "image": "http://localhost:8000/media/partners/i_3.webp",
        "order": 100
    },
    {
        "id": 2,
        "name": "Yandex",
        "image": "http://localhost:8000/media/partners/i_4.webp",
        "order": 10
    }
]
```
#### Пояснения к полям
1) name - Название - идет в тег alt
2) image - ссылка на фотографию
3) order - сортировка (с бека идет уже в отсортированном виде)
***
### GET /our-projects/gallery/
Возвращает массив данных о наших проектах. Это для блока Проекты на главной странце
#### Структура ответа
```json
[
    {
        "id": 2,
        "name": "test3",
        "description": "dev",
        "image": "http://localhost:8000/media/our_projects/kesson-na-ulitse.png",
        "order": 100
    },
    {
        "id": 6,
        "name": "sddds",
        "description": "dsfadf",
        "image": "http://localhost:8000/media/our_projects/i_3.webp",
        "order": 1
    }
]
```
#### Пояснения к полям
1) name - Название - идет в тег alt
2) description - Описание проекта
3) image - ссылка на фотографию
4) order - сортировка (с бека идет уже в отсортированном виде)

