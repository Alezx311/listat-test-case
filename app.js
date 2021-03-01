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
      //^ Evaluate each expression. Expression will be validated before calculating results
      const results = expressions.map(evalExp)
      //^ If All expressions valid, save results to file, and return 200
      await saveResults(results.join('\n'))
      return res.status(200).end()
    } else {
      throw new Error(`Empty expressions`)
    }
  } catch (err) {
    if (ERRORS_SHOW) console.error(err?.message ?? err) //^ Can be changed at ./config.js
    //^ file will be overwritten with '', if any errors will be finded, hope it correct
    await saveResults('')
    return res.status(400).end()
  }
})

module.exports = app
