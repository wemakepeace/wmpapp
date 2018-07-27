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
    console.log('accessKeyId', accessKeyId)
    console.log('secretAccessKey', secretAccessKey)
    // AWS.config.update({
    //     region: 'us-east-1',
    //     accessKeyId: accessKeyId,
    //     secretAccessKey: secretAccessKey,
    //     signatureVersion: 'v4'
    // });

    const signedUrlExpireSeconds = 60 * 10; // your expiry time in seconds.
    return new Promise((resolve, reject) => {
        if (!file) resolve();
        s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: `${folder}/${file}`,
            Expires: signedUrlExpireSeconds
        }, (err, url) => {
            if (err) {
                console.log('err', err)
                reject(err);
            }
            console.log('url', url)
            resolve(url);
        });
    });
};

module.exports = {
    getFileFromAWS
};
