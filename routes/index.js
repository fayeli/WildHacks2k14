var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Surveymo' });
});
router.get('/bdeeed28213c1646b84ef99fe7c6f94e.txt', function(req, res) {
  res.sendFile(__dirname + './bdeeed28213c1646b84ef99fe7c6f94e.txt');
});

module.exports = router;
