const crypto = require('crypto');
const csprngRand = require('csprng');
const jwt = require('jsonwebtoken');

/* Password salting & hashing helper functions */
const genRandomString = () => csprngRand(160, 36);

const pbkdf2 = (password, salt) => {
    let hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');

    return { passwordHash: hash.toString('hex'), salt: salt }
};

const saltHashPassword = (password) => {
    const salt = genRandomString();
    const passwordData = pbkdf2(password, salt);

    return passwordData;
};

/* Token helper functions */

const createToken = (id, classId) => {
    const secret = process.env.SECRET;
    const payload = { id: id };

    return jwt.sign(payload, secret, { expiresIn: '30m' });
};

const decodeToken = (token) => {
    const secret = process.env.SECRET;
    const decoded =  jwt.decode(token, secret);

    return decoded.id;
};

const checkPasswordsMatch = (password1, password2) => {
    return password1 === password2
}

const checkPasswordLength = (password) => {
    if (!password) return false;
    return password.length > 7
}

const validatePassword = (password1, password2) => {
    return !checkPasswordsMatch(password1, password2)
        ? ['Your passwords are not matching.']
        : !checkPasswordLength(password1)
        ? ['Your password must be at least 8 characters long.']
        : null;
}

module.exports = {
    saltHashPassword,
    pbkdf2,
    createToken,
    decodeToken,
    checkPasswordsMatch,
    checkPasswordLength,
    validatePassword
};

