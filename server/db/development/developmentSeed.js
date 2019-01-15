const conn = require('../conn');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const AgeGroup = require('../models/AgeGroup');
const Term = require('../models/Term');
const School = require('../models/School');
const Exchange = require('../models/Exchange');
const ageGroupData = require('../firstSeed/ageGroups');
const termData = require('../firstSeed/terms');
const { teachers, classes, schools, exchanges } = require('./testSeedingData');

const sync = () => conn.sync({ force: true, logging: console.log });

const developmentSeed = () => {
    return sync()
        .then(() => {
            const ageGroupPromises = ageGroupData.map(group => AgeGroup.create(group));
            const termPromises = termData.map(term => Term.create(term));
            return Promise.all([...ageGroupPromises, ...termPromises]);
        })
        .then(() => Promise.all(teachers.map(teacher => Teacher.create(teacher))))
            .then(() => {
                const ageGroupPromises = ageGroupData.map(group => AgeGroup.create(group));
                const termPromises = termData.map(term => Term.create(term));
                const schoolPromises = schools.map(school => School.createOrUpdate(school));

                return Promise.all([...ageGroupPromises, ...termPromises, ...schoolPromises]);
            })
            .then(() => Promise.all(classes.map((_class) => Class.create(_class))))
            .then(() => Promise.all(exchanges.map(exchange => Exchange.create(exchange))))
            .catch(error => console.log('error', error));
}


module.exports = developmentSeed;
