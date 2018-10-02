const app = require('../server');
const request = require('supertest');
const should = require('should');

describe('POST /exchange', () => {
    let token;
    let id;

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
            id = response.body.teacher.id;
            done();
        });
    });


    describe('Create exchange', () => {
        let classId;

        beforeAll(function (done) {
            return request(app)
            .post('/class')
            .set('Authorization', `Bearer ${token}`)
            .send({
                classData: {
                    id: null,
                    name: 'Test',
                    size: 'Test',
                    age_group: { label: '11-13 years', value: 2 },
                    term: { label: 'Spring 2019', value: 2 },
                    teacherId: id
                },
                schoolData: {
                    id: null,
                    schoolName: 'Test',
                    address1: '226 Broadway',
                    address2: null,
                    zip: '11211',
                    city: 'Brooklyn',
                    state: 'NY',
                    country: 'US',
                }
            })
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) return done(err);
                classId = response.body._class.id;
                done();
            });
        });

        it('Should register a class and return an exchange instance', (done) => {
            return request(app)
                .post('/exchange')
                .set('Authorization', `Bearer ${token}`)
                .send({ classId })
                .expect(200)
                .expect(hasStatus)
                .expect(findsMatch)
                .end((err, response) => {
                    if (err) return done(err);
                    done();
            });
        });
    });
});

const hasStatus = ({ body: { exchange } }) => exchange.should.have.property('status');
const findsMatch = ({ body: { exchange } }) => exchange.status === 'pending';
