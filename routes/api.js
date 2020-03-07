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
                if (reddit_res.statusCode == 200 && !err) {
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
                } else {
                    reject({
                        statusCode: reddit_res.statusCode,
                        error: err
                    });
                }
            });
    });
}

function subredditNotFoundError(err, res) {
    res.status(err.statusCode).render("error", {
        message: "Could not found that subreddit! Please check your spelling",
        error: { status: err.statusCode, stack: "" }
    });
}

router.get('/top/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("top", req.params.subreddit, req.params.count || 5)
        .then((posts) => {
            res.send(posts);
        })
        .catch((err) => {
            subredditNotFoundError(err, res);
        });
});

router.get('/hot/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("hot", req.params.subreddit, req.params.count || 5)
        .then((posts) => {
            res.send(posts);
        })
        .catch((err) => {
            subredditNotFoundError(err, res);
        });
});

router.get('/rising/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("rising", req.params.subreddit, req.params.count || 5)
        .then((posts) => {
            res.send(posts);
        })
        .catch((err) => {
            subredditNotFoundError(err, res);
        });
});

router.get('/new/:subreddit/:count?', (req, res, next) => {
    requestAndCleanPosts("new", req.params.subreddit, req.params.count || 5)
        .then((posts) => {
            res.send(posts);
        })
        .catch((err) => {
            subredditNotFoundError(err, res);
        });
});

module.exports = {
    router,
    requestAndCleanPosts
}