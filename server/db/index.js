const conn = require('./conn');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
const AgeGroup = require('./models/AgeGroup');
const Term = require('./models/Term');
const School = require('./models/School');
const Exchange = require('./models/Exchange');
const developmentSeed = require('./development/developmentSeed');

Class.belongsTo(Teacher);
Teacher.hasMany(Class);

Class.belongsTo(AgeGroup);
AgeGroup.hasMany(Class);

Class.belongsTo(Term);
Term.hasMany(Class);

Class.belongsTo(School);
School.hasMany(Class);

// creates senderId on Exchange
Exchange.belongsTo(Class, { as:  'sender' });
// creates receiverId on Exchange
Exchange.belongsTo(Class, { as:  'receiver' });


const sync = (forceBool) => conn.sync({ force: forceBool, logging: console.log });
const productionsSeed = (sync) => {
    return function() {
        return sync(false);
    }
}

let seed;


/* Uncomment before deploying */
if (process.env.NODE_ENV === 'development') {
    seed =  developmentSeed(sync);
} else {
    seed =  productionsSeed(sync);
}

module.exports = {
    sync,
    seed,
    conn,
    models: {
        Teacher,
        Class,
        AgeGroup,
        Term,
        School,
        Exchange
    }
}
