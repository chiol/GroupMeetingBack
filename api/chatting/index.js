const express = require('express');
const router = express.Router();
const ctrl = require('./chatting.ctrl');

router.get('/', ctrl.index);
router.post('/', ctrl.makeSocket);
// router.get('/:id', ctrl.showMsg);
router.post('/:id', ctrl.sendMsg);
// router.delete('/:id', ctrl.destroy);
// router.put('/:id',ctrl.update);

module.exports = router;
