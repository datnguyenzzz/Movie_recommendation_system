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
               +"and cast([averageRating] as int) >= 6.5 and cast([numVotes] as int) > 70000\n"
               +"and basics.startYear<>N'\\N' and cast(basics.startYear as int) = 2020\n"
               +"order by ratings.averageRating desc";
   
  //var command = "SELECT top 50 * from [title.episode]";
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

router.get('/searchNew', (req,res,next) => {
  var baseUri = "https://api.themoviedb.org/3/search/movie?"

  var api_key = req.query.api_key; 
  var query = req.query.query;
  var page = req.query.page

  baseUri = baseUri + "api_key=" + api_key + "&"
                    + "query=" + query + "&" 
                    + "page=" + page;
  console.log("***"+baseUri);

  httprequest (
    {url : baseUri},
    (error, response, body) => {
        console.log(baseUri);  
        res.send(JSON.parse(body));
    }
  )
})

router.get('/GetMovie', (req,res,next) => {

  var movieId_requested;

  for (const key in req.query) {
    movieId_requested = key;
    break;
  }

  var command = "select [originalTitle], [isAdult],[startYear], [runtimeMinutes], [genres], \n" +
                "[averageRating], [numVotes]\n"+
                "from [title.basics] as basics \n"+
                "inner join [title.ratings] ratings\n"+
                "on basics.tconst = N'"+movieId_requested+"' and basics.tconst = ratings.tconst\n" +
                "select principals.[nconst], [category], [characters], [primaryName]\n" +
                "from [title.principals] as principals \n" + 
                "inner join [name.basics] namebasics\n"+
                "on principals.tconst = N'"+movieId_requested+"'and principals.[nconst] = namebasics.nconst\n";

  request.query(command, (err,table) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send(table);
    }
  })
})

router.get('/getMovieList', (req,res,next) => {

  var type_requested;

  for (const key in req.query) {
    type_requested = key;
    break;
  }

  var command; 
  if ((type_requested === "2020") || (type_requested === "2019")) {
      console.log(type_requested);
      command = "select top 21 ratings.[tconst],[primaryTitle]\n"+
                  "from [title.ratings] as ratings\n"+
                  "inner join [title.basics] basics\n"+
                  "on basics.[tconst] = ratings.[tconst]\n"+
                  "and cast([averageRating] as int) >= 6 and cast([numVotes] as int) > 50000\n"+
                  "and basics.startYear<>N'\N' and (cast(basics.startYear as int) = "+type_requested+")\n"+
                  "order by ratings.averageRating desc"
  } 
  else if (type_requested === "highest_rating") {
      console.log(type_requested);
      command = "select top 21 ratings.[tconst],[primaryTitle]\n"+
                "from [title.ratings] as ratings\n"+
                "inner join [title.basics] basics\n"+
                "on basics.[tconst] = ratings.[tconst]\n"+
                "and cast([numVotes] as int) > 230000\n"+
                "order by ratings.averageRating desc"
  }
  else if (type_requested === "highest_react") {
      console.log(type_requested);
      command = "select top 21 ratings.[tconst],[primaryTitle]\n"+
                "from [title.ratings] as ratings\n"+
                "inner join [title.basics] basics\n"+
                "on basics.[tconst] = ratings.[tconst]\n"+
                "order by ratings.numVotes desc"
  }
  
  request.query(command, (err,table) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send(table);
    }
  })
})


router.get('/GetMovieById', (req,res,next) => {

  var movieId_requested = req.query.movie_id;


  var command = "select [tconst],[primaryTitle]\n" +
                "from [title.basics]\n"+
                "where [tconst] = N'"+movieId_requested+"'\n";

  request.query(command, (err,table) => {
    if (err) {
      console.log(err);
      return;
    } else {
      var data_found = table.recordsets[0][0];
      res.send(data_found);
    }
  })
})



//route + method to /user
module.exports = router;
