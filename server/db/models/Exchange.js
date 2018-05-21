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

Exchange.prototype.setStatus = function(status, t) {
    return this.updateAttributes({ status: status }, { transaction: t });
};

Exchange.prototype.setVerificationExpiration = function(t) {
    const date = new Date();
    const expires = date.setDate(date.getDate() + 7);
    return this.updateAttributes({ verifyExchangeExpires: expires }, { transaction: t });
};

Exchange.prototype.getClassRole = function(classId) {
    if (this.classAId === classId) {
        return 'A';
    }
    if (this.classBId === classId) {
        return 'B';
    }
    return 'none';
};

module.exports = Exchange;

/*
    Exchange statuses
    - initiated
    - pending
    - confirmed
    - cancelled
    - completed

*/
