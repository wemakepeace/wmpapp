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
    verifyExchangeToken: Sequelize.STRING,
    verifyExchangeTokenExpires: Sequelize.DATE
});

Exchange.prototype.setStatus = function(status) {
    return this.updateAttributes({ status: status })
    .then(exchange => {
        console.log('exchange in instance method', exchange)
        return exchange
    })
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
