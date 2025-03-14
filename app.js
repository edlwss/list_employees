const express = require('express');
const { PORT } = require('./constants/constants');
const { router } = require('./routes/routes');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./db'); 
const helper = require('./helpers/helper');

const app = express(); 

//json  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Handlebars
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: helper
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

async function init() {
    try {
        await sequelize.authenticate(); 
        console.log('Connected to PostgreSQL');
        await sequelize.sync(); 

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('Database connection error:', err);
    }
}

init();
