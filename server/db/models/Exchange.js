const conn = require('../conn');
const Sequelize = conn.Sequelize;
const Class = require('./Class');
const School = require('./School');
const Teacher = require('./Teacher');
const { extractDataForFrontend } = require('../../utils/helpers');

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


// Class methods
Exchange.getExchangeAndExchangingClass = function(classId) {
    return Exchange.findOne({
        where: {
            $or: [{ classAId: classId }, { classBId: classId }]
        }
    })
    .then((exchange) => {
        if (!exchange) {
            return null;
        }

        return Promise.all([
            exchange.getExchangeClassId(classId),
            exchange.getClassRole(classId)
        ])
        .then(([ exchangeClassId, classRole ]) => {
            exchange.dataValues.classRole = classRole;
            if (!exchangeClassId) {
                return extractDataForFrontend(exchange.dataValues, {});
            }

            const associations = [ School, Teacher ];
            return Class.getClassWithAssociations(exchangeClassId, associations)
                .then((exchangeClass) => {
                    exchange.dataValues.exchangeClass = exchangeClass
                    return extractDataForFrontend(exchange.dataValues, {});
                })
        })
    })
}




// Instance methods

Exchange.prototype.setStatus = function(status, t) {
    return this.updateAttributes({ status: status }, { transaction: t });
};

Exchange.prototype.setVerificationExpiration = function(t) {
    const date = new Date();
    const expires = date.setDate(date.getDate() + 7);
    return this.updateAttributes({ verifyExchangeExpires: expires }, { transaction: t });
};

Exchange.prototype.getClassRole = function(classId) {
    console.log('classId', classId)
    return new Promise((resolve, reject) => {
        if (classId == this.classAId) {
             return resolve('A');
        } else if (classId == this.classBId) {
             return resolve('B');
        } else {
             return reject()
        }
    })

};


Exchange.prototype.getExchangeClassId = function(id) {
    if (!id) return null;
    // classRole for the current class
    return this.getClassRole(id)
    .then((classRole) => {
        const exchangeClassId = classRole === 'A'
            ? this.classBId
            : this.classAId;

        return exchangeClassId;
    })
    // id for the other class participating in exchange

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
