const { Router } = require("express")
const UserService = require("../services/UserService");


const router = Router(); //набор маршрутов/адресов

router.get('/', async (req, res, next) => {
    const users = await UserService.getAllUsers();
        const plainUsers = users.map(user => user.get({ plain: true })); // Преобразуем объекты
        res.render('index', { users: plainUsers });
});

router.get('/new', (req, res, next) => {
    res.render('new', {})
});

router.post('/delete', (req, res, next) => {
    res.send({
        ok: 'delete'
    });
});

router.post('/new', (req, res, next) => {
    res.send({
        ok: 'create'
    });
});

module.exports = {
    router
};