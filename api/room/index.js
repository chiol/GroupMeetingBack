const express = require('express');
const router = express.Router();
const ctrl = require('./room.ctrl');

router.get('/', ctrl.index);
router.get('/findMyRoom/:name', ctrl.findMyRoom);
router.post('/create', ctrl.create);
router.get('/:id', ctrl.show);
router.put('/:id/allow', ctrl.allowUpdate);
router.put('/:id/match', ctrl.match);
// router.get('/:id', ctrl.show);
// router.delete('/:id', ctrl.destroy);
// router.put('/:id',ctrl.update);

module.exports = router;
