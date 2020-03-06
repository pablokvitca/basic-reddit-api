var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Reddit API' });
});

router.get('/top-posts/:subreddit/:count?', (req, res, next) => {
  res.send(req.params);
});

module.exports = router;
