if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express from 'express'
import path from 'path'

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'front-end/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
