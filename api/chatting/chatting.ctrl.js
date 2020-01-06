const app = require("../../index");
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const sockets = {};

const index = (req,res) => {
    // res.json({"length":Object.keys(sockets).length});
    res.json(sockets);
}

const makeSocket = (req, res) => {
    const id = req.body.id
    if (!id) return res.status(400).end();

    sockets[id] = io.of("/"+id);
    sockets[id].on("connection",(socket)=>{
        socket.on('sendchat', (data)=> {
            sockets[id].emit('updatechat',socket.username, data);
        })
    });
    res.status(201).end();
}

const sendMsg = (req, res) => {
    const id = req.params.id;
    const msg = req.body.msg;
    sockets[id].emit('sendchat',msg);

    res.status(201).end();
}

module.exports = {index,makeSocket,sendMsg}