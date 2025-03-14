const { Router } = require("express");
const UserService = require("../services/UserService");
const Department = require("../models/departament.model");
const Position = require("../models/position.model");

const router = Router();


router.get('/', async (req, res) => {
    const users = await UserService.getAllUsers();
    const departments = await Department.findAll();
    const positions = await Position.findAll();

    res.render('index', { 
        users: users.map(user => user.get({ plain: true })), 
        departments: departments.map(d => d.get({ plain: true })), 
        positions: positions.map(p => p.get({ plain: true }))
    });
});

router.get('/new', async (req, res) => {
    const departments = await Department.findAll();
    const positions = await Position.findAll();
    res.render('new', { 
        departments: departments.map(d => d.get({ plain: true })), 
        positions: positions.map(p => p.get({ plain: true })) 
    });
});


router.post('/new', async (req, res) => {
    const { lastName, firstName, middleName, birthDate, passport, contactInfo, address, departmentId, positionId, hireDate, status = true } = req.body;

    const [passportSeries, passportNumber] = passport.split('-');
    const cleanPhone = contactInfo.replace(/\D/g, '');

    try {
        await UserService.createUser({
            lastName, firstName, middleName, birthDate,
            passportSeries, passportNumber, contactInfo: cleanPhone,
            address, departmentId, positionId, hireDate,
            status: status === "true"
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при добавлении сотрудника");
    }
});

router.get('/user/:id', async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).send("Сотрудник не найден");
    const departments = await Department.findAll();
    const positions = await Position.findAll();

    res.render('user', { user: user.get({ plain: true }),
        departments: departments.map(d => d.get({ plain: true })), 
        positions: positions.map(p => p.get({ plain: true })) 
    });
});

router.post('/user/:id', async (req, res) => {
    const { lastName, firstName, middleName, birthDate, passport, contactInfo, address, departmentId, positionId, hireDate } = req.body;

    const [passportSeries, passportNumber] = passport.split('-');
    const cleanPhone = contactInfo.replace(/\D/g, '');

    try {
        await UserService.updateUser(req.params.id, {
            lastName, firstName, middleName, birthDate,
            passportSeries, passportNumber, contactInfo: cleanPhone,
            address, departmentId, positionId, hireDate
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при обновлении данных");
    }
});

router.post('/user/:id/status', async (req, res) => {
    try {
        await UserService.updateUser(req.params.id, { status: req.body.status });
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: "Ошибка при изменении статуса" });
    }
});

module.exports = {
    router
};
