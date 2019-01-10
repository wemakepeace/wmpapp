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
    senderVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    receiverVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verifyExchangeExpires: Sequelize.DATE
});


/*
 * Exchange statuses:
 *  - initiated
 *  - pending
 *  - confirmed
 *  - cancelled
 *  - completed
 */

// Class methods
Exchange.getExchangeAndMatchClass = function(classId) {
    return Exchange.findOne({
        where: {
            $or: [{ senderId: classId }, { receiverId: classId }]
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

            const otherClassRole = classRole === 'sender' ? 'Receiver' : 'Sender';
            const getterMethod = `get${otherClassRole}`;
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
                    });

                });
        });
    });
}


/*
 * Find all classes that:
 * - have the same ageGroupId
 * - the difference in class size is less than or equal 5 students
 * - do not belong to the current teacher or school
 * - are not from the same continent
 */

Exchange.findMatch = function(_class) {
    const { teacherId, schoolId, ageGroupId, school, size } = _class.dataValues;

    return Exchange.findAll({
        where: {
            status: 'initiated'
        },
        include: [{
            model: Class,
            as: 'sender',
            where: {
                teacherId: { $ne: teacherId },
                schoolId: { $ne: schoolId },
                ageGroupId: { $eq: ageGroupId },
                size:  {
                    $and: {
                        $gte: (size * 1) - 5,
                        $lte: (size * 1) + 5
                    }
                }
            },
            include: [
                { model: School, where: { continent: { $ne: school.continent } } },
                { model: Teacher }
            ]
        }]
    })
    .then((matchingClasses) => {

        // If matching classes are found, select the one furthest away
        if (matchingClasses && matchingClasses.length) {
            return findFurthestMatch(_class, matchingClasses);
        } else {
            return null;
        }
    });
}


// Instance methods

Exchange.prototype.setStatus = function(status, t) {
    return this.updateAttributes({ status: status }, { transaction: t })
};

Exchange.prototype.setVerificationExpiration = function(t) {
    const date = new Date();
    const expires = date.setDate(date.getDate() + 7);
    return this.updateAttributes({ verifyExchangeExpires: expires }, { transaction: t });
};

Exchange.prototype.getClassRole = function(classId) {
    return new Promise((resolve, reject) => {
        if (classId == this.senderId) {
             return resolve('sender');
        } else if (classId == this.receiverId) {
             return resolve('receiver');
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
            const exchangeClassId = classRole === 'sender'
                ? this.receiverId
                : this.senderId;
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
            const getterMethod = classRole === 'sender' ? 'getReceiver' : 'getSender';
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
                        this.dataValues.exchangeClass = exchangeClass;
                        return extractDataForFrontend(this.dataValues, {});
                    });
                });
        });
};

Exchange.prototype.getBasicInfo = function(t) {
    const { senderId, receiverId, id } = this;

    return Class.findAll({
        where: {
            $or: [
                { id: { $eq: senderId } },
                { id: { $eq: receiverId } }
            ]
        },
        include: [
            { model: Teacher, attributes: [ 'email', 'firstName' ] },
            { model: School, attributes: [ 'schoolName' ] }
        ],
        transaction: t
    });
};

module.exports = Exchange;
