const models = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const index = (req, res) => {
    req.query.limit = req.query.limit || 100;
    const limit = parseInt(req.query.limit, 10); 
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        });
};

const register = (req, res) =>{
    const useremail = req.body.useremail;
    const password = req.body.password;
    const name = req.body.name;
    const gender = req.body.gender;

    if (!useremail) return res.status(400).end();
    if (!password) return res.status(400).end();
    if (!name) return res.status(400).end();
    if (gender !== 'male' && gender !== 'female') return res.status(400).end();
    
    models.User.create({useremail, password, name, gender})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError' )  {
                return res.status(409).end();
            }
            res.status(500).end();
        })
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User.findOne({
        where: {id}
    }).then(user => {
        if (!user) return res.status(404).end();
        res.json(user);
    });
}

const login = (req, res) => {
    const useremail = req.body.useremail;
    const password = req.body.password;
    
    if (!useremail) return res.status(400).end();
    if (!password) return res.status(400).end();

    models.User.findOne({
        where: {useremail, password}
    }).then(user => {
        if (!user) return res.status(404).end();
        res.status(200).end();
    });
}

// const find = (req, res) => {
//     const name = req.params.name;
//     models.User
//         .findAll({
//             where:{
//                 name: {
//                     [Op.like] : '%' + name + '%'
//                 }
//             }
//         })
//         .then(users => {
//             res.json(users);
//         });
// };

const find = (req, res) => {
    const name = req.params.name;

    models.User
        .findOne({where:{name}})
        .then(user => {
            if (!user) return res.status(404).end();
            res.json(user);
        });
};
module.exports = {index, show, register, login, find};
