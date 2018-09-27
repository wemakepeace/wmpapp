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

describe('POST /public', () => {
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


