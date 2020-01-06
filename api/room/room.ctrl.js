const models = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const room_matching = require('./room_matching')

function checkNumber(obj) {
    
}
const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); 
    if (Number.isNaN(limit)) return res.status(400).end();
    
    models.Room
        .findAll({
            limit: limit
        })
        .then(rooms => {
            res.json(rooms);
        });
}

const findMyRoom = (req,res) => {
    const name = req.params.name;
    if (!name) return res.status(400).end()

    models.Room
        .findAll({
            where: {
                [Op.or]: [{leader: name}, {member1: name},{member2: name},{member3: name}]
            }
        })
        .then(rooms => {
            if (rooms.length === 0) return res.status(404).end();
            res.json(rooms);
        });
}

const create = (req, res) =>{
    const number = parseInt(req.body.number,10);
    const leader = req.body.leader;
    const member1 = req.body.member1;
    const member2 = req.body.member2 || "";
    const member3 = req.body.member3 || "";
    const gender = req.body.gender;
    const option = req.body.option;

    if (!number) return res.status(400).end();
    if (Number.isNaN(number)) return res.status(400).end();
    if (number < 2 || number > 4 ) return res.status(400).end();
    
    if (!leader) return res.status(400).end();
    if (!member1) return res.status(400).end();
    
    const member = [leader,member1,member2,member3];

    while (member[member.length -1] == "") {member.pop()} // null 값 제거
    if (member.length !== number) return res.status(400).end(); // 멤버 수가 정확하게 적혀있는기 검사

    // 중복 멤버 검사
    for (let i = 0; i < member.length; i++) {
        for (let j = 0; j < member.length; j++) {
            let k = false;
            i !== j && member[i] == member[j] ? k = true : {};
            if (k) return res.status(400).end();
        }
    }


    const allow = {};
    allow[member[0]] = true;
    for (let i = 1; i < number; i++) {allow[member[i]] = false}
    
    models.Room.create({number, leader,member1,member2,member3,allow,gender,option})
        .then(room => {
            res.status(201).json(room);
        })
        .catch(err => {
            if (err.name === "SequelizeValidationError") return res.status(400).end();
            res.status(500).end();
        })
}

const allowUpdate = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    
    if (Number.isNaN(id)) return res.status(400).end();  
    if (!name) return res.status(400).end();
    
    models.Room.findOne({where: {id}})
        .then(room => {
            if (!room) return res.status(404).end();

            let allow = JSON.parse(room.allow);
            if (allow[name] === undefined) return res.status(400).end();
            if (allow[name] === true) return res.status(400).end();
            allow[name] = true;
            room.allow = allow;

            let count = 0;
            Object.values(room.allow).forEach(tf => {
                if (tf) {count += 1};
            });
            if (parseInt(room.number, 10) == count) {
                room.state = 'ready';
            }
            room.save()
                .then(_ => {
                    res.json(room);
                })
                .catch(err => {
                    if (err.name == 'SequelizeUniqueConstraintError')  {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                })
        })
}

const match = (req, res) => {
    const id = parseInt(req.params.id, 10);

    models.Room.findOne({where: {id}})
        .then(room => {
            if (!room) return res.status(404).end();
            // if (room.state != 'ready') return res.status(400).end();
            room.state = 'match';
            room.save()
                .then(_ => {
                    room_matching.matching(room);
                    res.json(room);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError')  {
                    return res.status(409).end();
                    }
                    res.status(500).end();
                })
        })
}
const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.Room.findOne({
        where: {id}
    }).then(room => {
        if (!room) return res.status(404).end();
        res.json(room);
    });
}
module.exports = {index, findMyRoom, create, allowUpdate, match, show};
