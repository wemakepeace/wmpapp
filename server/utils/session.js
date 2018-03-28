const extractSessionData = ({ id, firstName, lastName, email, phone, classes }) => {
    return {
        id,
        firstName,
        lastName,
        email,
        phone,
        classes
    }
};

module.exports = {
    extractSessionData
};
