const Helpers = require('./Helpers')
const express = require('express')
const { HTTP_PORT = 3001 } = require('./config')
const app = express()

app.use(express.json())

//* index route, return status 404
app.all('/', (req, res) => {
  res.status(404).end()
})
//* read results from file
app.get('/result', async (req, res) => {
  const results = await Helpers.readResults()

  res.status(200).json({ results }).end()
})
//* check expressions and write to file
app.post('/data', async (req, res) => {
  //* Use try/catch cause i will throw errors if expression is not valid
  try {
    const { expressions } = req.body
    //* Helpers.evalExp() will validate expresssion before calculate
    const results = expressions.map(Helpers.evalExp)
    //* If we dont have errors here, all expressions is valid
    await Helpers.saveResults(results.join('\n'))

    res.status(200).end()
  } catch (err) {
    //* On errors, show it before sending response
    console.error(err?.message ?? err)
    //* Write empty string to file, for correct next /result request
    await Helpers.saveResults('')
    res.status(400).end()
  }
})

app.listen(HTTP_PORT, err => {
  if (err) {
    console.error(`Error on server starting: ${err?.message ?? err}`)
    process.exitCode = 1
  } else {
    console.info(`Server starting at http://localhost:${HTTP_PORT}`)
  }
})
