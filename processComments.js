export default function processComments(redditData) {
  const data = (() => {
    const newDataObject = {}

    for (let i = 1; i <= 999; i++) {
      newDataObject[i] = []
    }

    return newDataObject
  })()
  const loggedUsers = {}

  for (const comment of redditData.comments) {
    //Bail out if user is deleted
    if (comment.author === '[deleted]') continue

    //Try to parse new vote
    const number = parseInt(comment.body)

    //Bail out if not a number or out of range
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

      //Remove credit from later vote
      data[number].splice(data[loggedUsers[comment.author].number].indexOf(comment.author), 1)

      //Update first vote time
      loggedUsers[comment.author].created = comment.created

      //Add credit for earlier vote
      data[number].push(comment.author)
      continue
    }

    //User voted twice and this is the later vote. Do nothing
  }

  return data
}