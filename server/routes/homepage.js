var express = require('express');
var router = express.Router();

var mssql = require('mssql/msnodesqlv8');

var config = {
    server : 'localhost',
    database : 'systemDB',
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }
}

var conn = new mssql.connect(config,(err) => {
     if(err){
       console.log("Error while connecting database: " + err)
     }else{
       console.log("connected to database: " + config.server)
     }
   }
)

var request = new mssql.Request(conn);

/* GET users listing. */
router.get('/TrailerShowcase', function(req, res, next) {

  request.query("select top 50 * from [title.basics]", (err,table) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send(table);
    }

    conn.close();
  })

});

//route + method to /user
module.exports = router;
