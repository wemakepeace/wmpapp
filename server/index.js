const conn = require('./conn');
const Teacher = require('./db/models/Teacher');


const sync = () => conn.sync({ force: true });

const seed = () => {
    return sync()
        .then(() => {
            const seedTeacher = Teacher.create({ firstName: 'Leonard', lastName: 'Alnes', email: 'k@m.com', password: '11111111' })
            return Promise.all([seedTeacher])
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = {
    sync,
    seed,
    models: {
        Teacher
    }
}
