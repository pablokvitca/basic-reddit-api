var express = require('express');
var router = express.Router();
const api = require('./api');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Reddit API' });
});

router.get('/posts/:sort/:subreddit/:count?', (req, res, next) => {
  sortType = req.params.sort
  subreddit = req.params.subreddit
  count = req.params.count || 5
  maxOverflowed = 0
  if (count > 100) {
    maxOverflowed = count;
    count = 100;
  }
  if (["top", "hot", "rising", "new"].includes(sortType)) {
    posts = api.requestAndCleanPosts(sortType, subreddit, count)
      .then((posts) => {
        res.render("basic-view", {
          sortType: sortType,
          subreddit: subreddit,
          count: count,
          posts: posts,
          maxOverflowed: maxOverflowed
        });
      })
      .catch((err) => {
        res.status(err.statusCode).render("error", {
          message: "Could not found that subreddit! Please check your spelling",
          error: { status: err.statusCode, stack: "" }
        });
      })
  } else {
    res.render("error", {
      message: "Valid sorts are 'top', 'hot', 'rising', or 'new'.",
      error: { status: 404, stack: "" }
    });
  }
});

module.exports = router;
