var express = require('express');
var router = express.Router();

const data = require('../../Presentation/View/test.json')

/* GET airports listing. */
router.get('/flight', function(req, res, next) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

module.exports = router;
