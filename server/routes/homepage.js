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

/* GET users listing. */
router.get('/TrailerShowcase', function(req, res, next) {

  var command = "select top 8 ratings.[tconst],[averageRating],[numVotes],[titleType],\n"
               +"[primaryTitle],[startYear],[genres],[isAdult],[runtimeMinutes]\n"
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


router.get('/search', (req,res,next) => {
  var baseUri = "https://api.themoviedb.org/3/search/movie?"
  for (const key in req.query) {
    baseUri = baseUri + key +"="+req.query[key]+"&";
  }
  baseUri = baseUri.slice(0,baseUri.length-1)
  httprequest (
    {url : baseUri},
    (error, response, body) => {
        console.log(baseUri);  
        res.send(JSON.parse(body));
    }
  )
})



//route + method to /user
module.exports = router;
