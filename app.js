const express = require('express');
const { PORT } = require('./constants/constants');
const { router } = require('./routes/routes');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./db'); // Импортируем подключение к БД

const app = express(); // Создаём веб-приложение

// Настройка Handlebars
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем маршруты
app.use(router);

// Функция инициализации приложения
async function init() {
    try {
        await sequelize.authenticate(); // Проверяем подключение к БД
        console.log('Connected to PostgreSQL');

        await sequelize.sync(); // Опционально: синхронизируем модели с БД

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('Database connection error:', err);
    }
}

init();
