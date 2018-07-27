// const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');
// const secretAccessKey = process.env.SECRETACCESSKEY;
// const accessKeyId = process.env.ACCESSKEYID;

// //configuring the AWS environment
// AWS.config.update({
//     accessKeyId,
//     secretAccessKey
//   });

// var s3 = new AWS.S3();
// var filePath = "./file.txt";

// //configuring parameters
// var params = {
//   Bucket: 'wemakepeace',
//   Body : fs.createReadStream(filePath),
//   Key : "letter_templates/"+Date.now()+"_"+path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }

//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });
