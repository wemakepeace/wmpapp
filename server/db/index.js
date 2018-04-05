const conn = require('./conn');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
const AgeGroup = require('./models/AgeGroup');
const Term = require('./models/Term');

const ageGroupData = require('../constants/ageGroups');
const termData = require('../constants/terms');

Class.belongsTo(Teacher);
Teacher.hasMany(Class);

Class.belongsTo(AgeGroup);
AgeGroup.hasMany(Class);

Class.belongsTo(Term);
Term.hasMany(Class);

const teachers = [
    {
        firstName: 'Leonard',
        lastName: 'Alnes',
        email: 'k@m.com',
        password: 'z'
    },
    {
        firstName: 'Moon',
        lastName: 'Alnes',
        email: 'moon@m.com',
        password: 'z'
    },
    {
        firstName: 'Nacy',
        lastName: 'Yo yo',
        email: 'cantstopnanc@m.com',
        password: 'z'
    },
    {
        firstName: 'Corn',
        lastName: 'Flakes',
        email: 'cornstar88@m.com',
        password: 'z'
    }
]

const sync = () => conn.sync({ force: true });

const seed = () => {
    return sync({ force: true })
        .then(() => {

            const teacherPromises = teachers.map(teacher => {
                return Teacher.create(teacher);
            })
            return Promise.all(teacherPromises)
            .then(result => {
                const ageGroupPromises = ageGroupData.map(group => AgeGroup.create(group))
                const termPromises = termData.map(term => Term.create(term))
                return Promise.all([...ageGroupPromises, ...termPromises])
            })
            .then(result => {
                const classInstance1 = Class.create({teacherId: 1, name: '1A', size: 30, ageGroupId:2, termId: 1 });
                const classInstance2 = Class.create({teacherId: 1, name: '1B', size: 28, ageGroupId: 1, termId: 2 });
                return Promise.all([classInstance1, classInstance2])
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = {
    sync,
    seed,
    conn,
    models: {
        Teacher,
        Class,
        AgeGroup,
        Term
    }
}
