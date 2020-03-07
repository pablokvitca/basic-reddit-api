# Basic Reddit API
This a quick simple implementation of a wrapper for the Reddit API, showing only some relvant information about each post.
It allows API users (or UI users) to find the top posts for a given subreddit. This can be customized to return the 
either the *top*, *hot*, *new*, or *rising* posts.

There is basic UI built with Bootstrap and Nunjucks and a basic API built on Node.js and Express.

See it running on Heroku! 
- Root: [https://basic-reddit-api.herokuapp.com/](https://basic-reddit-api.herokuapp.com/)
- API Example 1: [https://basic-reddit-api.herokuapp.com/api/top/politics/15](https://basic-reddit-api.herokuapp.com/api/top/politics/15)
- API Example 2: [https://basic-reddit-api.herokuapp.com/api/rising/programmer/62](https://basic-reddit-api.herokuapp.com/api/rising/programmer/62)
- UI Example 1: [https://basic-reddit-api.herokuapp.com/posts/hot/programmer/25](https://basic-reddit-api.herokuapp.com/posts/hot/programmer/25)
- UI Example 2: [https://basic-reddit-api.herokuapp.com/posts/top/politics/100](https://basic-reddit-api.herokuapp.com/posts/top/politics/100)

## Tools used
- Node.js
- Express
- Nunjucks
- Bootstrap
- Requests

## Other tools used for development
- Yeoman
- VSCode
- Postman

## How to Use
### API
All the API endpoints are in the */api* route. There is 4 different endpoints, with similar functionality. Note that these could be implemented as as single route,
however I wanted to show the option to have different routes. For all these routes, the response from Reddit is clean, stripped of not needed data, and returned as a simple JSON list of post objects that look like the following:
```
{
    title: " ... POST TITLE ... ", // Comes from reddit's "title" attribute
    text: " ... POST TEXT ... ", // Comes from reddit's "selftext" attribute
    thumbnail: " ... THUMBNAIL URL ... ", // Comes from reddit's "thumbnail" attribute
    permalink: " ... POST PERMALINK ... ", // Comes from reddit's "permalink" attribute
    url: "... POST URL ... ", // Comes from reddit's "url" attribute
    date: "... UTC DATE ...: // Comes from reddit's "created_utc" attribute
}
```

#### TOP Posts
```/api/top/[subreddit]/[count?=5]```
Finds the top (count, by default 5) posts on the given subreddit, using the "top" ordering. As resulting from the [top API call on the Reddit API](https://www.reddit.com/dev/api/#GET_{sort}).

#### HOT Posts
```/api/hot/[subreddit]/[count?=5]```
Finds the top (count, by default 5) posts on the given subreddit, using the "hot" ordering. As resulting from the [hot API call on the Reddit API](https://www.reddit.com/dev/api/#GET_hot).

#### RISING Posts
```/api/rising/[subreddit]/[count?=5]```
Finds the top (count, by default 5) posts on the given subreddit, using the "rising" ordering. As resulting from the [rising API call on the Reddit API](https://www.reddit.com/dev/api/#GET_rising).

#### NEW Posts
```/api/new/[subreddit]/[count?=5]```
Finds the top (count, by default 5) posts on the given subreddit, using the "new" ordering. As resulting from the [new API call on the Reddit API](https://www.reddit.com/dev/api/#GET_new).

## How to Run
- Clone this repo
- Run ```npm install``` (on the root folder)
- Run ```npm start```
- Visit *http://localhost:3000* for the homepage. 
- Visit *http://localhost:3000/posts/top/\[subreddit\]/10* to get the *top* *10* posts for the *subreddit*

## Program Overview
- The server is implemented on node.js+express. These combination uses the routes (defined on *routes/api.js* and *routes/index.js*).
- The API route simply accesses the Reddit API for the given subreddit, and cleans all the data tha is not needed.
- For the UI, it was implemented quickly using Bootstrap and Nunjucks for the templating. It gets the posts form the API **internally** by using an exported *Promise* function, and then delegates the rendering to Nunjucks.
- Finally, Nunjucks (and some clever CSS from Bootstrap) can render the posts on the UI.