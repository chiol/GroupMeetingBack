const request = require('supertest');
const should = require('should');
const app = require('../../index');
const models = require('../../models');
const rooms = require('../../models/room.test');
before(() => models.sequelize.sync({force: true}));
before(() => models.Room.bulkCreate(rooms));

function clone(obj) {
    var output = {};
    for(var i in obj){
        output[i] = obj[i];
    }
    return output
}
describe('GET /room/:id는', ()=> {

    describe("성공시", ()=>{
        it("id를 갖는 룸의 정보를 반환한다.", done => {
            request(app)
            .get("/room/1")
            .expect(200)
            .end((err,res) => {
                res.body.should.have.property('id', 1);
                done()
            })
        })
    })
    describe("실패시", ()=>{
        it("id가 숫자가 아닌 경우.", done => {
            request(app)
            .get("/room/ab")
            .expect(400)
            .end(() => done())
        })
    })

})



describe('GET /room/findMyRoom/:name는', ()=> {

    describe("성공시", ()=>{
        it("room에 대한 배열을 반환한다", done => {
            request(app)
            .get("/room/findMyRoom/Ada")
            .expect(200)
            .end((err, res) => {
                res.body.should.be.instanceOf(Array);
                done();
            })
        })
    })
    describe("실패시", ()=> {
        it("name이 user에 없는 경우", done => {
            request(app)
            .get("/room/findMyRoom/Ad")
            .expect(404)
            .end(done)
        });        
    })
})
describe("POSt /room/create", ()=>{
    let body = {
        number: 4,
        leader: "test_leader",
        member1: "test_member1",
        member2: "test_member2",
        member3: "test_member3",
        gender: "male"
    }
    describe("성공시", () =>{
        it("room을 만든다.", done => {
            request(app)
            .post("/room/create")
            .send(body)
            .expect(201)
            .end(done)
        })
    })

    describe("실패시", () =>{
        describe("누락", ()=> {
            it("number", done => {
                var test_body = clone(body);
                delete test_body.number;
                request(app)
                .post("/room/create")
                .send(test_body)
                .expect(400)
                .end(done)
            })
            it("gender", done => {
                var test_body = clone(body);
                delete test_body.gender;
                request(app)
                .post("/room/create")
                .send(test_body)
                .expect(400)
                .end(done)
            })
        })
        describe("number가 2미만 혹은 5 초과인 경우", ()=> {
            it("number = 1", done => {
                var test_body = clone(body);
                test_body.number = 1;
                request(app)
                .post("/room/create")
                .send(test_body)
                .expect(400)
                .end(done)
            })
            it("number = 5", done => {
                var test_body = clone(body);
                test_body.number = 5;
                request(app)
                .post("/room/create")
                .send(test_body)
                .expect(400)
                .end(done)
            })
        })
        describe("number와 멤버의 수가 같지 않는 경우", ()=> {
            it("number = 3, 멤버 수 = 4", done => {
                var test_body = clone(body);
                test_body.number = 3;
                request(app)
                .post("/room/create")
                .send(test_body)
                .expect(400)
                .end(done)
            })
        })
        describe("중복된 멤버가 들어가는 경우", ()=> {
            it("leader == member1", done => {
                var test_body = clone(body);
                test_body.member1 = test_body.leader;
                request(app)
                .post("/room/create")
                .send(test_body)
                .expect(400)
                .end(done)
            })
        })
    })
})
describe("PUT /room/:id/allow",() => {
    describe("성공시", ()=> {
        var body;
        before(done => {
            request(app)
            .put("/room/1/allow")
            .send({name:"Aimee"})
            .expect(200)
            .end((err,res) => {
                body = res.body;
                done();
            })
        })
        it("방의 정보를 반환한다.", () => {
            body.should.have.property("member1","Aimee");
        })
        it("해당 name의 allow를 true로 바꾼다.", () => {
            body.allow.should.have.property("Aimee",true);
        })
        it("모든 멤버가 true이면 state는 ready가 된다.", () => {
            body.should.have.property("state","ready");
        })
    })
    describe("실패시", () => {
        it("name이 누락된 경우", done => {
            request(app)
            .put("/room/1/allow")
            .expect(400)
            .end(done)
        })
        it("name이 member 안에 없는 경우", done => {
            request(app)
            .put("/room/1/allow")
            .send({name:"absa"})
            .expect(400)
            .end(done)
        })
        it("이미 true인 멤버에게 요청한 경우", done => {
            request(app)
            .put("/room/1/allow")
            .send({name:"Ada"})
            .expect(400)
            .end(done)
        })
    })
})