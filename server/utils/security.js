const crypto = require('crypto');
const csprngRand = require('csprng');

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

module.exports = {
    saltHashPassword,
    pbkdf2
};
