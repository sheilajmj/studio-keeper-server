const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config')
const router = express.Router()

aws.config.update({
    secretAccessKey:   config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
});

const s3 = new aws.S3();
app.use(bodyParser.json());
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            console.log(file);
            cb(null, date + file.originalname); 
        },
        key: function(req, file, cb){
            cb(null, Date.now().toString())
        }
    })
})

router
.route('/image-upload')
.post(upload.single('image'), (req, res, next) => {
    res.send('Successfully uploaded' + req.file)
})
    