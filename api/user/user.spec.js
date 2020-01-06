const request = require('supertest');
const should = require('should');
const app = require('../../index');
const models = require('../../models');
const users = require('../../models/user.test');

var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }
var index = generateRandom(0,users.length-1)
const err_name = 'err_name';
const err_email = 'err@gmail.com';
const err_password = 'err_password';

describe('GET /user/:name는', ()=> {

  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  const name = users[index].name
  describe('성공시', ()=> {
    it('name이 '+ name + '인 유저 객체를 반환한다', (done) => {
      request(app)
          .get('/user/find/'+name)
          .expect(200)
          .end((err, res) =>{
            res.body.should.have.property('name', name);
            done();
          });
    });
  });
  describe('실패시', ()=> {
    it('name의 유저를 찾을수 없을 경우 404로 응답한다', (done) => {
      request(app)
          .get('/users/find/'+err_name)
          .expect(404)
          .end(done);
    });
  })
});

describe('POST /user/register', ()=>{

  const useremail = 'test@email.com'; 
  const password = 'test'; 
  const name = 'test';
  const gender = "male";
  let body;
  describe('성공시', ()=> {
    before(done=>{
      request(app)
          .post('/user/register')
          .send({useremail,password,name,gender})
          .expect(201)
          .end((err, res) => {
            body = res.body;
            done();
          });
    });
    it('생성된 유저 객체를 반환한다', ()=>{
      body.should.have.property('id');
      body.should.have.property('useremail',useremail);
      body.should.have.property('password',password);
      body.should.have.property('name',name);
      body.should.have.property('gender',gender);
    });
  });
  describe('실패시', ()=> {
    describe('누락', () => {
      it('name 파라매터 누락시 400을 반환한다', (done)=>{
        request(app)
            .post('/user/register')
            .send({useremail,password,gender})
            .expect(400)
            .end(done)
      });
      it('useremail 파라매터 누락시 400을 반환한다', (done)=>{
        request(app)
            .post('/user/register')
            .send({password,name,gender})
            .expect(400)
            .end(done)
      });
      it('password 파라매터 누락시 400을 반환한다', (done)=>{
        request(app)
            .post('/user/register')
            .send({useremail,name,gender})
            .expect(400)
            .end(done)
      });
      it('gender 파라매터 누락시 400을 반환한다', (done)=>{
        request(app)
            .post('/user/register')
            .send({useremail,password,name})
            .expect(400)
            .end(done)
      });
    })
    describe('중복', () => {
      it("email 중복일 경우 409를 반환한다", done=>{
        const useremail = 'babo'
        request(app)
        .post('/user/register')
        .send({useremail,password,name,gender})
        .expect(409)
        .end(done)
      })
      it("name 중복일 경우 409를 반환한다", done=>{
        const name = 'babo'
        request(app)
        .post('/user/register')
        .send({useremail,password,name,gender})
        .expect(409)
        .end(done)
      })
    })
  })
});


describe('POST /user/login',() =>{
  const useremail = users[index].useremail
  const password = users[index].password
  describe('성공시', ()=>{
    it("200을 반환한다.", done=> {
      request(app)
      .post('/user/login')
      .send({useremail,password})
      .expect(200)
      .end(done)
    })
  })
  describe('실패시', ()=>{
    describe('Body의 내용이 누락된 경우 400을 반환한다.', ()=> {
      it("useremail이 누락된 경우", done=> {
        request(app)
        .post('/user/login')
        .send({password})
        .expect(400)
        .end(done)
      })
      it("password이 누락된 경우", done=> {
        request(app)
        .post('/user/login')
        .send({password})
        .expect(400)
        .end(done)
      })
    });
    describe('User를 찾을 수 없는 경우 404을 반환한다.', ()=> {
      it("email이 틀린 경우", done=> {
        request(app)
        .post('/user/login')
        .send({err_email,err_password})
        .expect(400)
        .end(done)
      })
    });
  })

})