const conn = require('./conn');
const Teacher = require('./db/models/Teacher');
const Class = require('./db/models/Class');


Class.belongsTo(Teacher);
Teacher.hasMany(Class);

const sync = () => conn.sync({ force: true });

const seed = () => {
    return sync({ force: true })
        .then(() => {
            const teacher1 = Teacher.create({ firstName: 'Leonard', lastName: 'Alnes', email: 'k@m.com', password: 'z' });
            const teacher2 = Teacher.create({ firstName: 'Moon', lastName: 'Alnes', email: 'moon@m.com', password: 'z' });
            const classInstance1 = Class.create({teacherId: 1});
            const classInstance2 = Class.create({teacherId: 1});
            return Promise.all([teacher1, teacher2, classInstance1, classInstance2])
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
        Class
    }
}
