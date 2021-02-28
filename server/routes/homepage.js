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

  var command = "select top 10 ratings.[tconst],[averageRating],[numVotes],[titleType],\n"
               +"[primaryTitle],[startYear],[genres],[isAdult]\n"
               +"from [title.ratings] as ratings\n"
               +"inner join [title.basics] basics\n"
               +"on basics.[tconst] = ratings.[tconst]\n"
               +"and cast([averageRating] as int) >= 6.5 and cast([numVotes] as int) > 90000\n"
               +"and basics.startYear<>N'\\N' and cast(basics.startYear as int) = 2020\n"
               +"order by ratings.averageRating desc";

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
