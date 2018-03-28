const feedback = (type, messages) => {
    return {
        type,
        messages
    }
};

const extractSequelizeErrorMessages = (error, defaultError) => {
    if (error && (error.name.indexOf('Sequelize') > -1)) {
        return error.errors.map(err => {
            return err.message;
        });
    } else {
        return [defaultError];
    }
};



module.exports = {
    feedback,
    extractSequelizeErrorMessages
};
