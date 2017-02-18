const express = require('express')
const app = express()

require('./db')

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(3000, () => {
  console.log('Server is on.')
})
