const express = require('express')
const router = express.Router()

require('./user')(router)
require('./owned_monster')(router)
require('./owned_food')(router)
require('./seed')(router)
require('./user_key')(router)

module.exports = router
