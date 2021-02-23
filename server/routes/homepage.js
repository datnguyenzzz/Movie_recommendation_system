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

  var command = "select top 20 *\n"+
                "from [title.basics] as basics\n"+
                "inner join [title.ratings] ratings\n"+
                "on ratings.tconst = basics.tconst\n"+
                "where (basics.startYear<>N'\\N' and cast(basics.startYear as int) = 2020)\n"+
                "order by ratings.averageRating + ratings.numVotes desc\n";

  request.query(command, (err,table) => {
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
