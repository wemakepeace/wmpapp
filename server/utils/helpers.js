/* Manual way of extractingd data for FE*/
/* Assumes classes is an Array*/
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

/** recursive method for extracting data for Frontend */
/* Assumes classes is an object */

const valuesForFrontend = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'classes',
    'size',
    'name',
    'size',
    'age_group',
    'label',
    'term'
];


const isObject = (obj) => {
    if(Array.isArray(obj)) {
        return false;
    }
    return obj === Object(obj);
};

const extractDataForFrontend = (data, result) => {

    valuesForFrontend.map(key => {
        if (data.hasOwnProperty(key)) {
            if (isObject(data[key])) {
                // it is an object, call recursively
                result[key] = extractDataForFrontend(data[key], {});
            } else {
                result[key] = data[key];
            }
        } else {
          return;
        }
    })

    return result;
};

module.exports = {
    extractSessionData,
    extractDataForFrontend
};
