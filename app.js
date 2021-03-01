const express = require('express')
//^ Useful functions
const { readResults, saveResults, evalExp, randomExpression, randomExpressions } = require('./Helpers')
//^ For debug
const { ERRORS_SHOW } = require('./config')
const app = express()

app.use(express.json({ limit: '10000kb' }))
app.use(express.urlencoded({ limit: '5000kb', extended: false }))

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
app.get('/random', (req, res) => {
  const expression = randomExpression()
  return res.status(200).json({ expression }).end()
})
app.get(`/random/:size`, (req, res) => {
  const { size } = req.params
  if (size > 100000) {
    return res.status(413).json({ message: 'Maximum amount of expressions is 100000' }).end()
  }
  const expressions = randomExpressions(Number(size))
  return res.status(200).json({ expressions }).end()
})

module.exports = app
