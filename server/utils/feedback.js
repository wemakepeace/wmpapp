const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

const feedback = (type, messages) => {
    return {
        type,
        messages
    }
};

const extractSequelizeErrorMessages = (error, defaultError) => {
    // console.log('error!', error, 'END OF ERROR ======')
    // console.log('error.name!', error.name)
    // console.log('error.errors!', error.errors)
    if (typeof error === 'string') {
        return [error]
    } else if (error && error.name && (error.name.indexOf('SequelizeDatabaseError') > -1) && !error.errors) {
       return [defaultError];
    } else if (error && (error.name.indexOf('Sequelize') > -1) && error.errors) {
        return error.errors.map(err => {
            return err.message;
        });
    } else {
        return [defaultError];
    }
};

const sendError = (errorCode, error, defaultError, res) => {
    console.log('error', error)
    const errorMessages = extractSequelizeErrorMessages(error, defaultError);
    return res.status(errorCode).send({ feedback: feedback(ERROR, errorMessages) });
}

module.exports = {
    feedback,
    extractSequelizeErrorMessages,
    sendError
};
