const conn = require('../conn');
const Sequelize = conn.Sequelize;
const { extractDataForFrontend } = require('../../utils/helpers');
const AgeGroup = require('./AgeGroup');
const Term = require('./Term');
const School = require('./School');


const Class = conn.define('class', {
     name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out class name.'}
        }
    },
    size: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out class size.'},
            isInteger(value) {
                if (Number(value) === NaN) {
                    throw new Error('Class size must be a number.')
                }
            }
        }
    }
});

Class.getClassWithAssociations = function(id, associations) {
    return Class.findOne({
        where: { id },
        include: associations
    })
        .then(_class => {

             _class = _class.dataValues;

            if (_class.age_group) {
                _class.age_group = _class.age_group.formatForSelect();
            }

            if (_class.term) {
                _class.term = _class.term.formatForSelect();
            }

            if (_class.school) {
                _class.school = _class.school.dataValues;
            }

            if (_class.teacher) {
                _class.teacher = _class.teacher.dataValues;
            }

            return extractDataForFrontend(_class, {});
        });
};

Class.createOrUpdate = function(classData, t) {
    classData.termId = classData.term.value;
    classData.ageGroupId = classData.age_group.value

    if (classData.id === null) {
        return Class.create(classData, { transaction: t });
    } else {
        return Class.findById(classData.id)
            .then(_class => _class.update(classData, { transaction: t }));
    }
};

Class.deleteByTeacherId = function(teacherId, t) {
    return Class.destroy({ where: { teacherId }, transaction: t })
}


// Instance methods
Class.prototype.getClassWithAssociations = function(t) {
    let _class = this.dataValues;

    return Promise.all([
        this.getTerm({ transaction: t }),
        this.getAge_group({ transaction: t }),
        this.getSchool({ transaction: t })
    ])
    .then(([term, age_group, school]) => {
        if (term) {
            _class.term = term.formatForSelect();
        }

        if (age_group) {
            _class.age_group = age_group.formatForSelect();
        }

        if (school) {
            _class.school = school.dataValues;
        }

        return extractDataForFrontend(_class, {});
    });
};


module.exports = Class;
