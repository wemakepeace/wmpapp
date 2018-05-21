const conn = require('../conn');
const Sequelize = conn.Sequelize;

const AgeGroup = conn.define('age_group', {
     name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out what age group your class belongs to.'}
        }
    }
});

AgeGroup.prototype.formatForSelect = function() {
    return {
        label: this.name,
        value: this.id
    };
};


module.exports = AgeGroup;
