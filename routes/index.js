var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Surveymo', displayName: (req.user || {}).displayName });
});
router.get('/bdeeed28213c1646b84ef99fe7c6f94e.txt', function(req, res) {
  res.sendFile('D:\\home\\site\\wwwroot\\routes\\bdeeed28213c1646b84ef99fe7c6f94e.txt');
});
router.get('/herpderp', function(req, res) {
	req.post({
		url: 'https://api.venmo.com/v1/payments',
		form: {
			access_token: (req.user || {}).accessToken,
			user_id: 'isaacsanders',
			note: 'Hey bae',
			amount: 0.01,
		}
	}, function(err, httpResponse, body) {
		console.log(err, body)
	} )
});

module.exports = router;
