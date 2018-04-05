const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Term = conn.define('term', {
    term: {
        type: Sequelize.STRING
    }
});

module.exports = Term;
