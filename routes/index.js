const express = require('express')
const router = express.Router()

require('./user')(router)
require('./owned_monster')(router)
require('./seed')(router)

module.exports = router
