const express = require('express')
//^ Useful functions
const { readResults, saveResults, evalExp } = require('./Helpers')
//^ For debug
const { ERRORS_SHOW } = require('./config')
const app = express()

app.use(express.json())

app.get('/result', async (req, res) => {
  const results = await readResults()
  return res.status(200).json({ results }).end()
})

app.post('/data', async (req, res) => {
  try {
    const { expressions } = req.body
    if (expressions && expressions.length) {
      //^ Validate & Calculate each expression.
      const results = expressions.map(evalExp)

      await saveResults(results.join('\n'))

      return res.status(200).end()
    } else {
      throw new Error(`Empty expressions`)
    }
  } catch (err) {
    if (ERRORS_SHOW) console.error(err?.message ?? err)
    //^ If any of expression are invalid, file will be overwriten with empty string
    //* Hope it is correct, cause we need to return a result of last expressions
    await saveResults('')
    return res.status(400).end()
  }
})

module.exports = app
