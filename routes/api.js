var express = require('express');
var router = express.Router();
const request = require('request');
//API ROUTES

//Helper that gets the top posts (by the given sort) on the given subreddit, and cleans them.
function requestAndCleanPosts(sortType, subreddit, count) {
    return new Promise((resolve, reject) => {
        url = `https://reddit.com/r/${subreddit}/${sortType}.json?limit=${count}`
        request(url, { json: true },
            (err, reddit_res, body) => {
                if (err || reddit_res.statusCode != 200) {
                    res.status(500).send("Something happened. Please refer to the README.md for documentation details.");
                    reject(err);
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
                resolve(posts);
            });
    });
}

router.get('/top/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("top", req.params.subreddit, req.params.count || 5).then((posts) => {
        res.send(posts);
    });
});

router.get('/hot/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("hot", req.params.subreddit, req.params.count || 5).then((posts) => {
        res.send(posts);
    });
});

router.get('/rising/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("rising", req.params.subreddit, req.params.count || 5).then((posts) => {
        res.send(posts);
    });
});

router.get('/new/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("new", req.params.subreddit, req.params.count || 5).then((posts) => {
        res.send(posts);
    });
});

module.exports = {
    router,
    requestAndCleanPosts
}