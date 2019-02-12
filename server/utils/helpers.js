const countries =  require('country-list');

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
    'value',
    'term',
    'school',
    'schoolName',
    'address1',
    'address2',
    'zip',
    'city',
    'state',
    'country',
    'schools',
    'exchange',
    'sender',
    'receiver',
    'status',
    'verifyExchangeExpires',
    'status',
    'senderId',
    'receiverId',
    'teacher',
    'senderVerified',
    'receiverVerified',
    'exchangeClass',
    'classRole',
    'lat',
    'lng'
];

const isObject = (obj) => {
    if(Array.isArray(obj)) {
        return false;
    }
    return obj === Object(obj);
};

const extractDataForFrontend = (data, result) => {
    if (!data) {
        return {}
    }

    valuesForFrontend.map(key => {
        if (data.hasOwnProperty(key)) {
            if (isObject(data[key])) {
                // it is an object, call recursively
                result[key] = extractDataForFrontend(data[key], {});
            } else if (Array.isArray(data[key]) && data[key].length && data[key][0].hasOwnProperty('id')) {
                result[key] = data[key].reduce((collection, _key, index) => {
                    const id = _key.id;
                    collection[id] = extractDataForFrontend(data[key][index], {})
                    return collection;
                }, {})
            } else {
                result[key] = data[key];
            }
        } else {
          return;
        }
    })
    return result;
};


const getCountryName = (code) => {
    return countries().getName(code);
}

module.exports = {
    extractSessionData,
    extractDataForFrontend,
    getCountryName
};
