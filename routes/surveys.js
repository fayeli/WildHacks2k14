var express = require('express');
var router = express.Router();

/* GET surveys listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* GET new surveys form. */
router.get('/new', function(req, res) {
  res.render('surveys/new', { title: 'New Survey', displayName: (req.user || {}).displayName });
});

module.exports = router;
