var express = require('express');
var router = express.Router();
var httprequest = require('request');

var mssql = require('mssql/msnodesqlv8');

var dbConfig = {
    server : 'localhost',
    database : 'systemDB',
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }
}

var conn = new mssql.connect(dbConfig, (err) => {
  if (err) console.log(err);
});
var request = new mssql.Request(conn);

/* AES 256  */

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

router.post('/signUp', (req,res,next) => {
    console.log('someone wanna signing up mewmew');
})

module.exports = router;