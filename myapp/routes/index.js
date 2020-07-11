var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { big_title: 'GeneProject',title: 'Our Gene Project index',data : "We have testAPI. Use to URL/testAPI/ \n..." });
});

module.exports = router;
