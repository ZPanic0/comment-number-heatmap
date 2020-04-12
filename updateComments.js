const fetch = require('node-fetch')

fetch('https://comment-number-heatmap.herokuapp.com/getcomments')
    .then(() => console.log('Fetched /getComments endpoint on schedule.'))