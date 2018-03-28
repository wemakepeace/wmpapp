const extractSessionData = ({ id, firstName, lastName, email, phone, classes }) => {
    if (classes && classes.length) {
        classes = extractClassData(classes)
    }
    return {
        id,
        firstName,
        lastName,
        email,
        phone,
        classes
    }
};

const extractClassData = (classes) => {
    return classes.map(({ id, size, name, age_group }) => {
        age_group = age_group && age_group.id
        ? extractAgegroupData(age_group)
        : {}

        return {
            id,
            size,
            name,
            age_group
        }
    })

};

const extractAgegroupData = ({ id, value }) => {
    return {
        id,
        value
    }
};

module.exports = {
    extractSessionData
};
