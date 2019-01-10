const AWS = require('aws-sdk');
const Promise = require('bluebird');
const bucket = process.env.BUCKET;
const accessKeyId = process.env.ACCESSKEYID;
const secretAccessKey = process.env.SECRETACCESSKEY;


AWS.config.update({
        region: 'us-east-1',
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        signatureVersion: 'v4'
    });

/*
 * creates a signedURL that is valid for a specified time
 * so the user can access the file
*/
const getFileFromAWS = (file, folder) => {
    const s3 = new AWS.S3();
    const signedUrlExpireSeconds = 60 * 10; // your expiry time in seconds.
    return new Promise((resolve, reject) => {
        if (!file) resolve();
        s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: `${folder}/${file}`,
            Expires: signedUrlExpireSeconds
        }, (err, url) => {
            if (err) {
                return reject(err);
            }
            return resolve(url);
        });
    });
};


const getMaterialsAWS = (classRole) => {
    const templateFolder = `letter_templates/${classRole}`;
    const instructionsFolder = `instructions/${classRole}`;

    const letters = ['letter_1.pdf', 'letter_2.pdf', 'letter_3.pdf'];
    const instructions = ['instructions_letter_1.pdf', 'instructions_letter_2.pdf', 'instructions_letter_3.pdf']

    const importantInformationPromise = getFileFromAWS('important_information.pdf', 'instructions');
    const letterPromises = letters.map((letter) => getFileFromAWS(letter, templateFolder));
    const instructionPromises = instructions.map((instruction) => getFileFromAWS(instruction, instructionsFolder));

    return Promise.all([importantInformationPromise, ...instructionPromises, ...letterPromises ])
   .then(([ importantInformation, instruction1, instruction2, instruction3, letter1, letter2, letter3 ]) => {
        const materials = {
            importantInformation,
            letter1: { instruction1, letter1 },
            letter2: { instruction2, letter2 },
            letter3: { instruction3, letter3 }
        }
        return materials;
   })
   .catch(error => {
        throw 'Something went wrong when fetching data. Please refresh.'
    });

}

module.exports = {
    getFileFromAWS,
    getMaterialsAWS
};
