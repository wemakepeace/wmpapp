const feedback = (type, messages) => {
    return {
        type,
        messages
    }
};

const extractSequelizeErrorMessages = (response) => {
    return response.errors.map(err => {
        return err.message
    });
};

module.exports = {
    feedback,
    extractSequelizeErrorMessages
};
