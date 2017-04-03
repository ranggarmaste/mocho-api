const models = require('../models')
const UserKey = models.UserKey
const User = models.User
const request = require('request')

module.exports = (router) => {
  router.get('/user_keys', (req, res) => {
    UserKey.findAll()
    .then((userKeys) => {
      res.json(userKeys)
    })
  })

  router.delete('/user_keys/:username', (req, res) => {
    let username = req.params.username
    UserKey.findOne({
      where: {
        username: username
      }
    }).then((user) => {
      if (user)
        return user.destroy()
    }).then(() => {
      res.json({status: "OK"})
    })
  })

  router.post('/user_keys/:username', (req, res) => {
    let username = req.params.username
    let key = req.body.key
    UserKey.findOne({
      where: {
        username: username
      }
    }).then((user_key) => {
      if (!user_key) {
        UserKey.create({username: username, deviceKey: key})
        .then(() => {
          res.json({status: "OK"})
        })
      } else {
        user_key.update({username: username, deviceKey: key})
        .then(() => {
          res.json({status: "OK"})
        })
      }
    })
  })

  router.get('/user_keys/:username/win', (req, res) => {
    let exp = req.params.exp
    let username = req.params.username
    UserKey.findOne({
      where: {
        username: username
      }
    }).then((user) => {
      let key = user.deviceKey
      sendMessageToUser(key, 100)
      res.json({status: "OK"})
    })
  })

  router.get('/user_keys/:username/found/:monster', (req, res) => {
    let monster = req.params.monster
    let username = req.params.username
    User.findOne({
      where: { username: username }
    }).then((user) => {
      user.searchChance -= 1
      user.save().then(() => {
        if (monster !== 'none') {
          UserKey.findOne({
            where: { username: username }
          }).then((user_key) => {
            let key = user_key.deviceKey
            sendMessageToUser(key, monster)
            res.json({searchChance: user.searchChance})
          })
        } else {
          res.json({searchChance: user.searchChance})
        }
      })
    })
  })
}

function sendMessageToUser(deviceId, data) {
  let title = ""
  let body = ""
  if (data == 100) {
    title = "You Win!"
    body = "Your monster just won a battle!"
  } else {
    title = "New Monster"
    body = "You just found a new monster: " + data
  }
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': 'key=AAAAUrsJw7w:APA91bEYw63CLTOAZs6nneenW3iS2TxVhEgLRAhDhK9u5LUC1J-kG7dk7j-l0mC4dOpgiNtPasSJFsTrs2kMdhAK6nNrNAicDHhenb-gt81yto-wFculDTS2UQw9iwTAE9XU-PNXoK6w'
    },
    body: JSON.stringify(
      {
        "notification": {
          "title": title,
          "body": body
        },
        "data": {
          "data": data,
        },
        "to" : deviceId
      }
    )
  }, function(error, response, body) {
    if (error) {
      console.error(error, response, body);
    }
    else if (response.statusCode >= 400) {
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
    }
    else {
      console.log("SENT");
    }
  });
}
