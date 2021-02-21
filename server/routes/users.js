var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/mew', function(req, res, next) {
  res.send('respond with a resource mewmew');
});
//route + method to /user
module.exports = router;
