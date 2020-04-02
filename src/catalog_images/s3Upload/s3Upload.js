const express = require('express');
const router = express.Router();
const multer  = require('multer');
const AWS = require('aws-sdk');
const config = require('../../config')
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});
// var multipleUpload = multer({ storage: storage }).array('file');
const upload = multer({ storage: storage }).single('file');
const BUCKET_NAME = config.S3_BUCKET_NAME;
const IAM_USER_KEY = config.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = config.AWS_SECRET_ACCESS_KEY;

router
    .route('/images')
    .post(upload.single('image'), function (req, res) {
    const file = req.files;
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
s3bucket.createBucket(function () {
      let Bucket_Path = 'arn:aws:s3:us-west-1:139348107800:accesspoint/images';
      //Where you want to store your file
      var ResponseData = [];
   
file.map((item) => {
      var params = {
        Bucket: Bucket_Path,
        Key: item.originalname,
        Body: item.buffer,
        ACL: 'public-read'
  };
s3bucket.upload(params, function (err, data) {
        if (err) {
         res.json({ "error": true, "Message": err});
        }else{
            ResponseData.push(data);
            if(ResponseData.length == file.length){
              res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
            }
          }
       });
     });
   });
});
module.exports = router;