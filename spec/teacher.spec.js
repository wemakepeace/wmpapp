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

const hasTeacher = ({ body }) => body.should.have.property('teacher');
const hasFirstName = ({ body: { teacher } }) => teacher.should.have.property('firstName');
const hasLastName = ({ body: { teacher } }) => teacher.should.have.property('lastName');
const doesNotHavePassword = ({ body }) => body.teacher.should.not.have.property('password');
