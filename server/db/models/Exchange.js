const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Exchange = conn.define('exchange', {
     status: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: '.....'}
        }
    },
    classAVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    classBVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verifyExchangeExpires: Sequelize.DATE
});

Exchange.prototype.setStatus = function(status) {
    return this.updateAttributes({ status: status })
    .then(exchange => {
        console.log('exchange in instance method', exchange)
        return exchange
    })
}

Exchange.prototype.getClassRole = function(classId) {
    console.log('classId===', classId)
        if (this.classAId === classId) {
            return 'A'
        }
        if (this.classBId === classId) {
            return 'B'
        }
        return 'none'
}

module.exports = Exchange;

/*
    Exchange statuses
    - initiated
    - pending
    - confirmed
    - cancelled
    - completed

*/
