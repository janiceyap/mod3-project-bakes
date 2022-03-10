const S3ProfilePic = require('aws-sdk/clients/s3');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3ProfilePic = new S3ProfilePic({
    region,
    accessKeyId,
    secretAccessKey
});


module.exports = {

    uploadToS3: async (req, res, next) => {

        if (req.file){
            console.log("Request.file", req.file);

            // Can implement any resizing/compression here before upload.

            const file = req.file;
            const fileStream = fs.createReadStream(file.path);

            const uploadParams = {
                Bucket: bucketName,
                Body: fileStream,
                Key: file.filename
            };

            const result = await s3ProfilePic.upload(uploadParams).promise();
            console.log(result);

            await unlinkFile(file.path); // deleting file from the local folder after its in S3.

            req.body.profilePic = result.Key;
            
        }
        next();
    }
}

