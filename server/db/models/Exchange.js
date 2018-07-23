const conn = require('../conn');
const Sequelize = conn.Sequelize;
const Class = require('./Class');
const School = require('./School');
const Teacher = require('./Teacher');
const { extractDataForFrontend } = require('../../utils/helpers');
const { findFurthestMatch } = require('../../utils/findExchangeMatch');

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
Exchange.getExchangeAndMatchClass = function(classId) {
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

            const otherClassRole = classRole === 'A' ? 'B' : 'A';
            const getterMethod = `getClass${otherClassRole}`;
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

/*
 * Find all classes that:
 * - have the same termId and ageGroupId
 * - do not belong to the current teacher or school
 */

Exchange.findMatch = function(_class) {
    const { teacherId, schoolId, termId, ageGroupId } = _class.dataValues;
    return Exchange.findAll({
        where: {
            status: 'initiated'
        },
        include: [{
            model: Class,
            as: 'classA',
            where: {
                teacherId: { $ne: teacherId },
                schoolId: { $ne: schoolId },
                termId: { $eq: termId },
                ageGroupId: { $eq: ageGroupId }
            },
            attributes: [ 'name', 'id' ],
            include: [
                { model: School },
                { model: Teacher, attributes: [ 'id', 'email' ] }
            ]
        }]
    })
    .then((matchingClasses) => {
        // If matching classes are found
        if (matchingClasses && matchingClasses.length) {
            return findFurthestMatch(_class, matchingClasses);
        } else {
            return null;
        }
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

// returns the id of the other class participating in exchange, if any
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

Exchange.prototype.getExchangeAndMatchClass = function(classId) {
    return Promise.all([
            this.getClassRole(classId),
            this.getExchangeClassId(classId)
        ])
        .then(([ classRole, exchangeClassId ]) => {
            this.dataValues.classRole = classRole;
            if (!exchangeClassId) {
                return extractDataForFrontend(this.dataValues, {});
            }
            const otherClassRole = classRole === 'A' ? 'B' : 'A';
            const getterMethod = `getClass${otherClassRole}`;
            return this[ getterMethod ]()
                .then((exchangeClass) => {
                    return Promise.all([
                        exchangeClass.getTeacher(),
                        exchangeClass.getSchool()
                    ])
                    .then(([ teacher, school ]) => {
                        exchangeClass = exchangeClass.dataValues;
                        exchangeClass.school = school.dataValues;
                        exchangeClass.teacher = teacher.dataValues;
                        this.dataValues.exchangeClass = exchangeClass
                        return extractDataForFrontend(this.dataValues, {});
                    })
                });
        });
};


module.exports = Exchange;
