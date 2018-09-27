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

const hasClass = ({ body }) => body.should.have.property('_class');
const hasSchool = ({ body: { _class } }) => _class.should.have.property('school');
