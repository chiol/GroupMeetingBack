var fetch = require("node-fetch")

fetch("http://172.17.64.77:3000/room/findMyRoom/ab")
  .then(res => res.json())
  .then(body => console.log(body))
  .catch(err => console.log(err.type))