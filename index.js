if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express from 'express'
import compression from 'compression'
import { MongoClient } from 'mongodb'
import path from 'path'
import Snoowrap from 'snoowrap'
import processComments from './processComments'

const reddit = new Snoowrap({
  userAgent: 'node:comment-number-heatmap:v1 (by /u/ZPanic0)',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
})

const client = MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })
const PORT = process.env.PORT || 5000

let commentsCache

client.connect()

express()
  .use(compression())
  .use(express.static(path.join(__dirname, 'front-end/build')))
  .get('/data/', async (req, res) => {
    commentsCache = commentsCache || await client
      .db(process.env.DB_NAME)
      .collection('comments')
      .findOne({})

    res.json(commentsCache)
  })
  .get('/getcomments/', async (req, res) => {
    res.sendStatus(200)

    console.log('Beginning reddit update operation.')

    let redditResult = await reddit
      .getSubmission(process.env.REDDIT_SUBMISSION)
      .expandReplies({ limit: Infinity, depth: 1 })

    console.log('Finished pulling data from reddit.')

    //Forcefully resolving all author proxies
    redditResult = JSON.parse(JSON.stringify(redditResult))

    console.log('Finished stripping proxies.')

    const processedComments = processComments(redditResult)

    console.log('Processed comments.')

    await client
      .db(process.env.DB_NAME)
      .collection('comments')
      .replaceOne({}, processedComments, { upsert: true })

    console.log('Saved to mongodb.')

    commentsCache = processedComments

    console.log('Cached new comments.')
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
