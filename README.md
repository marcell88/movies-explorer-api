# Проект The Movies
Репозиторий для бэкенда приложения `The Movies`.

## Функционал - обработка запросов по api
* POST /signup - регистрация пользователя
* POST /signin - авторизация пользователя
* GET /users/me - получить данные пользователя
* PATCH /users/me - изменить данные пользователя
* GET /movies - получить все сохраненные фильмы пользователя
* POST /movies - сохранить фильм пользователю
* DELETE /movies/_id - удалить ранее сохраненный фильм 

## Бэкенд
* Сервер: NODE.js, express
* Базы данных: MongoDB, mongoose
* Запросы соответствуют стилю REST
* Сервер поддерживает механизм CORS
* Сервер развернут на виртуальное машине (Яндекс Облако) Ubuntu 20.04

## Адрес репозитория: 
https://github.com/marcell88/movies-explorer-api

## Ссылки на севрер (api)
IP 158.160.75.162
Backend http://api.themovies.nomoreparties.sbs/
