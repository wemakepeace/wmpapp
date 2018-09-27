const app = require('../server');
const request = require('supertest');
const should = require('should');

let token;

beforeAll((done) => {
  request(app)
    .post('/public/login')
    .send({
      email: 'k@m.com',
      password: 'z'
    })
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) return done(err);
        token = response.body.token; // save the token
        done();
    });
});

describe('GET /teacher', () => {
    // token not being sent - should respond with a 401
    it('It should require authorization', (done) => {
        return request(app)
            .get('/teacher')
            .expect(401)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    // send the token - should respond with a 200
    it('It should respond with 200 if token is valid', (done) => {
        return request(app)
            .get('/teacher')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
        });
    });

    const hasTeacher = ({ body }) => body.should.have.property('teacher');
    const hasFirstName = ({ body: { teacher } }) => teacher.should.have.property('firstName');
    const hasLastName = ({ body: { teacher } }) => teacher.should.have.property('lastName');
    const doesNotHavePassword = ({ body }) => body.teacher.should.not.have.property('password');

    it('Returns a user', function(done) {
        return request(app)
            .get('/teacher')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(hasTeacher)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Does not return password', function(done) {
        return request(app)
            .get('/teacher')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(doesNotHavePassword)
            .end(function(err) {
                if (err) return done(err);
                done();
            });
    });

    it('User has first name and last name', function(done) {
        return request(app)
            .get('/teacher')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(hasFirstName)
            .expect(hasLastName)
            .end(function(err) {
                if (err) return done(err);
                done();
            });
    });
});


//
describe('Teacher can login', () => {
    it('Succeeds when credentials are correct', function(done) {
        request(app)
        .post('/public/login')
        .send({ email: 'k@m.com', password: 'z' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err) {
            if (err) return done(err);
                done();
        });
    });

    const hasToken = ({ body }) => body.should.have.property('token');

    it('Returns a token and user when login is successful', function(done) {
        request(app)
        .post('/public/login')
        .send({ email: 'k@m.com', password: 'z' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect(hasToken)
        .end(function(err) {
            if (err) return done(err);
            done();
        });
    });

    it('Fails when credentials are wrong', function(done) {
        request(app)
        .post('/public/login')
        .send({ email: 't@m.com', password: 'z' })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function(err) {
            if (err) return done(err);
                done();
        });
    });
});

// Test class routes


describe('GET /class', () => {
    // token not being sent - should respond with a 401
    it('It should require authorization', (done) => {
        return request(app)
            .get('/class')
            .expect(401)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    // send the token - should respond with a 200
    it('It should respond with 200 if token is valid', (done) => {
        return request(app)
            .get('/class')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
        });
    });

    const hasClass = ({ body }) => body.should.have.property('_class');
    const hasSchool = ({ body: { _class } }) => _class.should.have.property('school');

    it('Returns a class', function(done) {
        return request(app)
            .get('/class/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(hasClass)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });


    it('Class has a school property', function(done) {
        return request(app)
            .get('/class/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(hasSchool)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
