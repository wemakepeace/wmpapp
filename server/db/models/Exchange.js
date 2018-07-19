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


/*  Exchange statuses:
 *  - initiated
 *  - pending
 *  - confirmed
 *  - cancelled
 *  - completed */



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
            exchange.getClassRole(classId),
            exchange.getExchangeClassId(classId)
        ])
        .then(([ classRole, exchangeClassId ]) => {
            exchange.dataValues.classRole = classRole;
            if (!exchangeClassId) {
                return extractDataForFrontend(exchange.dataValues, {});
            }

            const getterMethod = `getClass${classRole}`
            return exchange[ getterMethod ]()
                .then((exchangeClass) => {
                    return Promise.all([
                        exchangeClass.getTeacher(),
                        exchangeClass.getSchool()
                    ])
                    .then(([ teacher, school ]) => {
                        exchangeClass = exchangeClass.dataValues;
                        exchangeClass.school = school.dataValues;
                        exchangeClass.teacher = teacher.dataValues;
                        exchange.dataValues.exchangeClass = exchangeClass
                        return extractDataForFrontend(exchange.dataValues, {});
                    })

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
    return new Promise((resolve, reject) => {
        if (classId == this.classAId) {
             return resolve('A');
        } else if (classId == this.classBId) {
             return resolve('B');
        } else {
             return reject();
        }
    });

};


Exchange.prototype.getExchangeClassId = function(id) {
    if (!id) return null;
    return this.getClassRole(id)
        .then((classRole) => {
            const exchangeClassId = classRole === 'A'
                ? this.classBId
                : this.classAId;
            return exchangeClassId;
        });
}




module.exports = Exchange;
