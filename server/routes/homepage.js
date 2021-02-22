var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/TrailerShowcase', function(req, res, next) {
  res.send('respond with a resource');
});

//route + method to /user
module.exports = router;
