const app = require('./app')
const { HTTP_PORT } = require('./config')

app.listen(HTTP_PORT, err => {
  if (err) {
    console.error(`Error on server starting: ${err?.message ?? err}`)
    process.exitCode = 1
  } else {
    console.info(`Server starting at http://localhost:${HTTP_PORT}`)
  }
})
