var express = require('express');
var router = express.Router();

data = "We have testAPI,patientAPI, ..."

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { big_title: 'GeneProject',title: 'Our Gene Project index',data : data });
});

module.exports = router;
