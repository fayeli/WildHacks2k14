var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Surveymo', displayName: (req.user || { displayName: false }).displayName });
});
router.get('/bdeeed28213c1646b84ef99fe7c6f94e.txt', function(req, res) {
  res.sendFile('D:\\home\\site\\wwwroot\\routes\\bdeeed28213c1646b84ef99fe7c6f94e.txt');
});
module.exports = router;
