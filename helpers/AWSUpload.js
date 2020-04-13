const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const secret = require('../secret/secret')

AWS.config.update({
    accessKeyId: secret.aws.accessKeyId,
    secretAccessKey: secret.aws.secretAccessKey,
    region: 'eu-central-1'
});

const awsS3 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
        s3: awsS3,
        bucket: 'meanhero',
        acl: 'public-read',
        metadata: function(req, file, cb){         
            console.log( 'metadata', ' is called' );
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            console.log( 'key', ' is called' );
            cb(null, file.originalname);
        }
        
    }), 
    rename: function (fieldname, filename) {
        console.log( 'rename', ' is called' );
        return filename.replace(/\W+/g, '-').toLowerCase();
    }   
});

exports.Upload = upload;