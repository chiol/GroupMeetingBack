const express = require('express');
const router = express.Router();
const ctrl = require('./db_input.ctrl');

router.get('/users', ctrl.user_db);
router.get('/rooms', ctrl.room_db);

module.exports = router;
