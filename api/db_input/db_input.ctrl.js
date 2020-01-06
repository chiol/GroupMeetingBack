const models = require('../../models');
const users = require('../../models/user.test');
const rooms = require('../../models/room.test');

const user_db = (req,res) => {
    models.User.bulkCreate(users)
    .then(user=> res.json(user))
}
const room_db = (req,res) => {
    models.Room.bulkCreate(rooms)
    .then(room=> res.json(room))
}

module.exports = {user_db, room_db};
