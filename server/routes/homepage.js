var express = require('express');
var router = express.Router();

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

/* GET users listing. */
router.get('/TrailerShowcase', function(req, res, next) {

  request.query("select top 50 * from [title.basics]", (err,table) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send(table);
    }
  })

});


//route + method to /user
module.exports = router;
