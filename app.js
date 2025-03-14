const express = require('express');
const { PORT } = require('./constants/constants');
const { router } = require('./routes/routes');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./db'); // Импортируем подключение к БД
const helper = require('./helpers/helper');

const app = express(); // Создаём веб-приложение

//json  
app.use(express.json()); // Позволяет Express разбирать JSON-запросы
app.use(express.urlencoded({ extended: true })); // Позволяет работать с form-urlencoded


// Настройка Handlebars
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: helper
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
