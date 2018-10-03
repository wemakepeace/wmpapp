const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Term = conn.define('term', {
    name: {
        type: Sequelize.STRING
    },
    expires: Sequelize.DATE
});

Term.prototype.formatForSelect = function() {
    return {
        label: this.name,
        value: this.id
    };
};

module.exports = Term;
