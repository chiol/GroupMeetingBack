const models = require('../../models');

const matching = (room) => {
    console.log("id"+ room.id);
    const target = {};
    var target_room;
    // 성별 선택
    if (room.sex == 'male') {
        target.sex = 'female';
    } else {
        target.sex = 'male';
    }
    // 인원수 선택
    target.number = room.number;
    let count = 0
    var timerId = null;
    timerId = setInterval(() => {
        target_room = find_room(target.sex, target.number)
//        if (target_room) {
        if (count == 3) {
            console.log("찾았습니다. "+count);
            clearInterval(timerId);
        } else {
            console.log("찾지 못하였습니다. "+count);
            count += 1
        }
    }, 10000);
}
const find_room = (sex,number) => {
    models.Room.findOne({
        where: {
            sex : sex,
            number: number
        }
    }).then(room => {
        if (!room) {
            return false;
        }
        else {
            return room;
        }
    })
}

module.exports = {matching}