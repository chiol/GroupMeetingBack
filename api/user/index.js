const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/find/:name',ctrl.find);

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);

module.exports = router;
