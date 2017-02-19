const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes')
const models = require('./models')

// require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)

models.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log('Server is on.')
  })
})
