const conn = require('./conn');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
const AgeGroup = require('./models/AgeGroup');
const Term = require('./models/Term');
const School = require('./models/School');
const Exchange = require('./models/Exchange');

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

Class.belongsTo(Exchange);
Exchange.hasMany(Class);

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
        schoolName: 'Åse Barneskole',
        address1: 'Åsegjerdet 24',
        zip: '6017',
        city: 'Ålesund',
        state: null,
        country: 'NO'
    },
    {
        schoolName: 'PS 66',
        address1: '101 Groton Long Point Rd',
        zip: '06340',
        city: 'Groton',
        state: 'CT',
        country: 'US'
    },
    {
        schoolName: 'Lerstad Barneskole',
        address1: 'Kyrkjehaugen 2',
        address2: '',
        zip: '6014',
        city: 'Ålesund',
        state: 'Møre og Romsdal',
        country: 'NO'
    },
    {
        schoolName: 'Enghaveskolen',
        address1: 'Roesskovsvej 125',
        address2: '',
        zip: '5200',
        city: 'Odense',
        state: '',
        country: 'DK'
    }
];

const classes = [
    {
        teacherId: 1,
        name: '1A',
        size: 30,
        ageGroupId:2,
        termId: 1,
        schoolId: 1,
        exchangeId: 2
    },
    {
        teacherId: 1,
        name: '1B',
        size: 28,
        ageGroupId: 1,
        termId: 1,
        schoolId: 1
    },
    {
        teacherId: 2,
        name: '3F',
        size: 28,
        ageGroupId: 1,
        termId: 1,
        exchangeId:1,
        schoolId: 2
    },
    {
        teacherId: 2,
        name: '4E',
        size: 28,
        termId: 1,
        ageGroupId: 1,
        exchangeId:3,
        schoolId: 3
    },
    {
        teacherId: 4,
        name: '4E',
        size: 28,
        termId: 2,
        ageGroupId: 1,
        exchangeId: 4,
        schoolId: 4
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
                let exchangePromises = [];
                for (let i = 0; i < 4; i++) {
                  exchangePromises.push(Exchange.create({ status: 'initiated' }))
                }
                return Promise.all([...ageGroupPromises, ...termPromises, ...schoolPromises, exchangePromises]);
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
        School,
        Exchange
    }
}
