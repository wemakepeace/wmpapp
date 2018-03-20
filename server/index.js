const conn = require('./conn');
const Teacher = require('./db/models/Teacher');
const Class = require('./db/models/Class');


Class.belongsTo(Teacher);
Teacher.hasMany(Class);

const sync = () => conn.sync({ force: true });

const seed = () => {
    return sync({ force: true })
        .then(() => {
            const seedTeacher = Teacher.create({ firstName: 'Leonard', lastName: 'Alnes', email: 'k@m.com', password: '11111111' })
            const classInstance = Class.create({teacherId: 1})
            return Promise.all([seedTeacher, classInstance])
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = {
    sync,
    seed,
    models: {
        Teacher,
        Class
    }
}
