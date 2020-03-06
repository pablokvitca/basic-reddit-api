var express = require('express');
var router = express.Router();
const request = require('request');
//API ROUTES

//Helper that gets the top posts (by the given sort) on the given subreddit, and cleans them.
function requestAndCleanPosts(sortType, subreddit, count, res) {
    url = `https://reddit.com/r/${subreddit}/${sortType}.json?limit=${count}`
    request(url, { json: true },
        (err, reddit_res, body) => {
            if (err || reddit_res.statusCode != 200) {
                res.status(500).send("Something happened. Please refer to the README.md for documentation details.");
                return console.log(err);
            }
            posts = body.data.children;
            posts = posts.map(post => {
                return {
                    title: post.data.title,
                    text: post.data.selftext,
                    thumbnail: post.data.thumbnail,
                    permalink: post.data.permalink,
                    url: post.data.url,
                    date: post.data.created_utc
                }
            });
            res.send(posts);
        });
}

router.get('/top/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("top", req.params.subreddit, req.params.count || 5, res)
});

router.get('/hot/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("hot", req.params.subreddit, req.params.count || 5, res)
});

router.get('/rising/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("rising", req.params.subreddit, req.params.count || 5, res)
});

router.get('/new/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("new", req.params.subreddit, req.params.count || 5, res)
});

module.exports = router;