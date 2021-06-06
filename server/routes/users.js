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

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
  charactersLength)));
  }
  return result.join('');
}
/************/

router.post('/signUp', (req,res,next) => {
    console.log('SOMEONE TRYING TO SIGN UP');
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    var encrypted_pw = encrypt(req.body.password).encryptedData;
    
    var finding_command = "select count(*) as [number_users] from [Users.data]\n"+
                          "where [user_name] = N'" + req.body.username + "'";

    request.query(finding_command, (err,table) => {
      if (err) {
        console.log(err);
        return;
      } else {
        var found = table.recordsets[0][0]['number_users'];
        if (found > 0) {
          res.send({error : "Username had been used"})
        } else {
          //res.send({password : encrypted_pw});

          const uid = makeid(16);
          var adding_command = "insert into [Users.data]([user_id],[user_name],[password],[movies_saved],[movies_liked],[movies_disliked],[suggestion_movie])\n"+ 
                               "values ('"+uid+"','"+req.body.username+"','"+encrypted_pw+"','','','','')";
          request.query(adding_command, (err,table) => {
            if (err) {
              console.log(err);
              return;
            } else {
              res.send({username : req.body.username});
            }
          })
        }
      }
    })
})

router.post('/signIn', (req,res,next) => {
    console.log("SOMEONE'S TRYING TO LOGIN"); 
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    var finding_command = "select * from [Users.data]\n"+
                          "where [user_name] = N'" + req.body.username + "'";

    request.query(finding_command, (err,table) => {
        if (err) {
            console.log(err);
            return;
        } else {
            var data_found = table.recordsets[0][0];
            if (data_found['user_name'] === "") {
                res.send({error : "Username isn't exist"});
            } else {
                var encrypted_pw = encrypt(req.body.password).encryptedData;

                if (encrypted_pw !== data_found['password']) {
                    res.send({error : "Wrong password!!!"})
                } else {
                    res.send({username : req.body.username});
                }
            }
        }
    })
})

module.exports = router;