const conn = require('./conn');
const Teacher = require('./models/Teacher');


const sync = () => conn.sync({ force: true });

const seed = () => {
    return sync()
        .then(() => {
            return Teacher.create({ firstName: 'Leonard', lastName: 'Alnes', email: 'k@m.com', password: '11111111' })
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = {
    sync,
    seed
}
