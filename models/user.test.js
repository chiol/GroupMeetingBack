// { useremail, password, name, sex }

const users = []

const name = ["Ada", "Adolph", "Aimee", "Alexandra",
"Angel", "Barbara", "Baron", "Baxter",
"Bessie", "Bianca", "Blanche", "Caroline"];
const gender = ['male','female'];
let selectgender = 0;
name.forEach(element => {
    users.push({useremail:element+"@gmail",password:element,name:element,gender:gender[selectgender%2]})
    selectgender += 1;
});

module.exports = users