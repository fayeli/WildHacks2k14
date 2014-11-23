var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Surveymo', displayName: (req.user || { displayName: false }).displayName });
});
router.get('/bdeeed28213c1646b84ef99fe7c6f94e.txt', function(req, res) {
  res.sendFile('D:\\home\\site\\wwwroot\\routes\\bdeeed28213c1646b84ef99fe7c6f94e.txt');
});

router.get('/herpderp', function(req, res) {
	request.post({url:'https://api.venmo.com/v1/payments', form: {
		access_token: 'NyKFjDq4gyarqAFBt8gyDncmxpcMLNyP',
		user_id: '1533337634078720143',
		note: 'Hey bae',
		amount: 1
		}}, function(err, rs, b){res.send(rs)});
});
module.exports = router;
