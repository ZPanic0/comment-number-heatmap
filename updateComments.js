const fetch = require('node-fetch')

fetch('/getComments').then(() => console.log('Fetched /getComments endpoint on schedule.'))