// {number,leader,member1,member2,member3,allow,sex,option}


const rooms = []
rooms.push({number:2,leader:"Ada",member1:"Aimee",allow:{Ada:true,Aimee:false},gender:"male"})
rooms.push({number:3,leader:"Adolph",member1:"Alexandra",member2:"Barbara",allow:{Angel:true,Alexandra:true,"Barbara":false},gender:"female"})
rooms.push({number:2,leader:"Angel",member1:"Baron",allow:{Angel:true,Baron:false},gender:"male"})
rooms.push({number:3,leader:"Baxter",member1:"Bianca",member2:"Caroline",allow:{Baxter:true,Bianca:false,"Caroline":false},gender:"male"})

// var generateRandom = (min, max) => {
//     var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
//     return ranNum;
// }
// const roomNum = 4
// const name = [
//     "Ada", "Adolph", "Aimee", "Alexandra",
//     "Angel", "Barbara", "Baron", "Baxter",
//     "Bessie", "Bianca", "Blanche", "Caroline"
// ];
// const sex = ['male','female'];
// const member = ['leader','member1','member2','member3']

// for (let i = 0; i < roomNum; i++) {
//     let a = [];
//     let count = 0;
//     let allow = {};
//     number = generateRandom(2,4);
//     while (count != number) {
//         var ran = generateRandom(0,name.length-1);
//         if (a.find((item) => {return item == ran})) {}
//         else {
//             if (count == 0) {
//                 allow[name[ran]] = true;
//             }
//             else {
//                 allow[name[ran]] = false;
//             }
//             count += 1
//             a.push(ran)
//         }
//     }
//     let room = {}
//     room['number'] = number;
//     for (let j = 0; j < number; j++) {
//         room[member[j]] = Object.keys(allow)[j]        
//     }
//     room['allow'] = allow
//     room['sex'] = sex[i%2]

//     rooms.push(room)

// }

module.exports = rooms