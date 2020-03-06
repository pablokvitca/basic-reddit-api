var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Reddit API' });
});

router.get('/posts/:sort/:subreddit/:count?', (req, res, next) => {
  sortType = req.params.sort
  subreddit = req.params.subreddit
  count = req.params.count
  if (["top", "hot", "rising", "new"].includes(sortType)) {
    url = `http://localhost:3000/api/${sortType}/${subreddit}/${count}`
    request(url, { json: true },
      (err, reddit_res, body) => {
        if (!err) {
          res.render("basic-view", {
            sortType: sortType,
            subreddit: subreddit,
            count: count,
            posts: body
          });
        }
      });
  } else {
    res.render("error", {
      message: "404 Not Found",
      error: {
        status: 404,
        stack: ""
      }
    });
  }
});

module.exports = router;
