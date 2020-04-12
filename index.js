if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express from 'express'
import path from 'path'
import fs from 'fs'

const redditDataFilePath = process.env.REDDIT_FILE_PATH
const redditSubmission = process.env.REDDIT_SUBMISSION

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'front-end/build')))
  .get('/getcomments/', async (req, res) => {
    fs.writeFileSync(
      redditDataFilePath,
      await reddit
        .getSubmission(redditSubmission)
        .expandReplies({ limit: Infinity, depth: 1 })
    )

    res.sendStatus(200)
  })
  .get('/processcomments/', async (req, res) => {
    const data = (() => {
      const newDataObject = {}

      for (let i = 1; i <= 999; i++) {
        newDataObject[i] = []
      }

      return newDataObject
    })()
    const loggedUsers = {}
    const redditStash = JSON.parse(fs.readFileSync(redditDataFilePath))

    for (const comment of redditStash.comments) {
      //try to parse new vote
      const number = parseInt(comment.body)

      //bail out if not a number or out of range
      if (isNaN(number) || number < 0 || number > 999) continue

      //User is new. Handle new entry
      if (!loggedUsers[comment.author]) {
        loggedUsers[comment.author] = {
          created: comment.created,
          number: number,
          author: comment.author
        }

        data[number].push(comment.author)
        continue
      }

      //User voted twice and this is the earlier vote. Keep the earlier vote and clean up the later one
      if (comment.created < loggedUsers[comment.author].created) {

        //remove credit from later vote
        data[number].splice(data[loggedUsers[comment.author].number].indexOf(comment.author), 1)

        //Update first vote time
        loggedUsers[comment.author].created = comment.created

        //add credit for earlier vote
        data[number].push(comment.author)
        continue
      }

      //User voted twice and this is the later vote. Do nothing
    }

    fs.writeFileSync(process.env.FRONT_END_RESULT_PATH, JSON.stringify(data))
    res.sendStatus(200)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
