const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

const feedback = (type, messages) => {
    return {
        type,
        messages
    }
};

const extractSequelizeErrorMessages = (error, defaultError) => {
    if (error && (error.name.indexOf('SequelizeDatabaseError') > -1) && !error.errors) {
       return [defaultError];
    } else if (error && (error.name.indexOf('Sequelize') > -1)) {
        return error.errors.map(err => {
            return err.message;
        });
    } else {
        return [defaultError];
    }
};

const sendError = (errorCode, error, defaultError, res) => {
    // console.log('error', error)
    const errorMessages = extractSequelizeErrorMessages(error, defaultError);
    console.log('errorMessages', errorMessages)
    return res.status(errorCode).send({ feedback: feedback(ERROR, errorMessages) });
}

module.exports = {
    feedback,
    extractSequelizeErrorMessages,
    sendError
};
