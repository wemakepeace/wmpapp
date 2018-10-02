const app = require('../server');
const request = require('supertest');
const should = require('should');
const uuid = require('uuid/v1');

describe('POST /public', () => {
    it('Login succeeds when credentials are correct', function(done) {
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

    it('Creates a new user if all data is provided by user', function(done) {
        request(app)
        .post('/public/create')
        .send({
            data: {
                email: `${uuid()}@m.com`,
                password: '11111111',
                confirmPassword: '11111111',
                firstName: 'Leo',
                lastName: 'Nard'
            }
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err) {
            if (err) return done(err);
                done();
        });
    });

    it('Fails to creates a new user if password validations fail', function(done) {
        request(app)
        .post('/public/create')
        .send({
            data: {
                email: 'tom@m.com',
                password: '',
                confirmPassword: '',
                firstName: 'Leo',
                lastName: 'Nard'
            }
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function(err) {
            if (err) return done(err);
                done();
        });
    });

    it('Fails to creates a new user if information is missing', function(done) {
        request(app)
        .post('/public/create')
        .send({
            data: {
                email: '',
                password: '',
                confirmPassword: '',
                firstName: 'Leo',
                lastName: 'Nard'
            }
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function(err) {
            if (err) return done(err);
                done();
        });
    });


    it('Fails to creates a new user if email already exists in db', function(done) {
        request(app)
        .post('/public/create')
        .send({
            data: {
                email: 'k@m.com',
                password: '11111111',
                confirmPassword: '11111111',
                firstName: 'Leo',
                lastName: 'Nard'
            }
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function(err) {
            if (err) return done(err);
                done();
        });
    });


    it('Sends a reset password link if email exists in db', function(done) {
        request(app)
        .post('/public/resetrequest')
        .send({ email: 'k@m.com' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
                done();
        });
    });

    it('Sends rejects reset password request if email does not exist', function(done) {
        request(app)
        .post('/public/resetrequest')
        .send({ email: 'wrongemail@m.com' })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function(err, response) {
            if (err) return done(err);
                done();
        });
    });

});


const hasToken = ({ body }) => body.should.have.property('token');
