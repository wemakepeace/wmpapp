const conn = require('./conn');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
const AgeGroup = require('./models/AgeGroup');
const Term = require('./models/Term');
const School = require('./models/School');

const ageGroupData = require('../constants/ageGroups');
const termData = require('../constants/terms');

Class.belongsTo(Teacher);
Teacher.hasMany(Class);

Class.belongsTo(AgeGroup);
AgeGroup.hasMany(Class);

Class.belongsTo(Term);
Term.hasMany(Class);

Class.belongsTo(School);
School.hasMany(Class);

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
    },
    {
        firstName: 'Corny',
        lastName: 'Flakes',
        email: 'kris.alnes@gmail.com',
        password: 'z'
    }
];

const schools = [
    {
        name: 'Åse Barneskole',
        address1: 'Åsemulen 1',
        address2: '4A',
        zip: '6017',
        city: 'Ålesund',
        state: null,
        country: 'NO'
    },
    {
        name: 'PS 66',
        address1: '44 Whyte Ave',
        address2: '#16',
        zip: '11211',
        city: 'Brooklyn',
        state: 'NY',
        country: 'US'
    }
];

const classes = [
    {
        teacherId: 1,
        name: '1A',
        size: 30,
        ageGroupId:2,
        termId: 1,
        schoolId: 1
    },
    {
        teacherId: 1,
        name: '1B',
        size: 28,
        ageGroupId: 1,
        termId: 2,
        schoolId: 2
    },
    {
        teacherId: 2,
        name: '3F',
        size: 28
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
                const ageGroupPromises = ageGroupData.map(group => AgeGroup.create(group));
                const termPromises = termData.map(term => Term.create(term));
                const schoolPromises = schools.map(school => School.create(school));
                return Promise.all([...ageGroupPromises, ...termPromises, ...schoolPromises]);
            })
            .then(result => {
                const classPromises = classes.map(_class => Class.create(_class));
                return Promise.all(classPromises);
            })
        })
        .catch((error) => {
            console.log('error===', error)
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
        Term,
        School
    }
}
