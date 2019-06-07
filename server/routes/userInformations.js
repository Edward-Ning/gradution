var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var UserInformation = require('../models/userInformation')

mongoose.connect('mongodb://localhost:27017/gradb', { useNewUrlParser: true })

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.')
})

//Get users listing

router.get('/', function (req, res, next) {
  res.send('users/')
})

router.get('/test', function (req, res, next) {
  res.send('users/test')
})

router.post('/login', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  UserInformation.findOne(data, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        if (doc.userPermission === 'admin') {
          res.cookie('userName', doc.userName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.json({
            status: '0',
            msg: '',
            result: {
              userName: doc.userName,
              userPwd: doc.userPwd,
              url: '/backgroundTask'
            }
          })
        } else {
          res.cookie('userName', doc.userName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.json({
            status: '0',
            msg: '',
            result: {
              userName: doc.userName,
              userPwd: doc.userPwd,
              url: '/'
            }
          })
        }
      } else {
        res.json({
          status: '2',
          msg: '未查询到'
        })
      }
    }
  })
})

router.post('/logout', function (req, res, next) {
  res.json({
    status: '3',
    msg: '成功登出'
  })
})

router.post('/register', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    userPermission: 'common'
  }
  console.log(data)
  UserInformation.find({userName: data.userName}, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      console.log(doc)
      if (doc.length !== 0) {
        console.log(2)
        res.json({
          status: '2'
        })
      } else {
        UserInformation.create(data, (err, doc) => {
          if (err) {
            res.json({
              status: '1',
              err: err.message
            })
          } else {
            if (doc) {
              res.json({
                status: '0',
                result: doc
              })
            }
          }
        })
      }
    }
  })
})

router.post('/userFind', function (req, res, next) {
  UserInformation.findOne({userName: req.body.userName}, function (err, doc) {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        res.json({
          result: doc
        })
      }
    }
  })
})

router.post('/userChange', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    userCompanyName: req.body.userCompanyName,
    userCompanyAddress: req.body.userCompanyAddress,
    userPhoneNumber: req.body.userPhoneNumber,
    userEmail: req.body.userEmail,
    userFax: req.body.userFax,
    _id: req.body._id
  }
  UserInformation.update({_id: data._id}, data, function (err, response) {
    if (err) {
      res.json({
        status: '1'
      })
    } else if (response) {
      res.json({
        status: '0',
        res: response
      })
    }
  })
})

router.post('/find', function (req, res, next) {
  UserInformation.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        res.json({
          result: doc
        })
      }
    }
  })
})

function isEmpty (obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object);
}

function deleteEmptyString (test, recurse) {
  for (let i in test) {
    if (test[i] === '') {
      delete test[i]
    } else if (recurse && typeof test[i] === 'object') {
      deleteEmptyString(test[i], recurse)
    }
  }
}

function deleteEmptyObject (test, recurse) {
  for (let i in test) {
    if (isEmpty(test[i])) {
      delete test[i]
    } else if (recurse && typeof test[i] === 'object') {
      deleteEmptyObject(test[i], recurse)
    }
  }
}

router.post('/search', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    userPermission: req.body.userPermission,
    userCompanyName: req.body.userCompanyName,
    userCompanyAddress: req.body.userCompanyAddress,
    userPhoneNumber: req.body.userPhoneNumber,
    userEmail: req.body.userEmail,
    userFax: req.body.userFax
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  UserInformation.find(data, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        console.log(doc)
        res.json({
          status: '0',
          result: doc
        })
      }
    }
  })
})

router.post('/edit', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    userPermission: req.body.userPermission,
    userCompanyName: req.body.userCompanyName,
    userCompanyAddress: req.body.userCompanyAddress,
    userPhoneNumber: req.body.userPhoneNumber,
    userEmail: req.body.userEmail,
    userFax: req.body.userFax,
    _id: req.body._id
  }
  UserInformation.update({_id: data._id}, data, function (err, response) {
    if (err) {
      res.json({
        status: '1'
      })
    } else if (response) {
      res.json({
        status: '0',
        res: response
      })
    }
  })
})

router.post('/delete', function (req, res, next) {
  let data = {
    _id: req.body._id
  }
  UserInformation.deleteOne({_id: data._id}, function (err, response) {
    if (err) {
      res.json({
        status: '1'
      })
    } else if (response) {
      res.json({
        status: '0',
        res: response
      })
    }
  })
})

router.post('/add', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    userPermission: req.body.userPermission,
    userCompanyName: req.body.userCompanyName,
    userCompanyAddress: req.body.userCompanyAddress,
    userPhoneNumber: req.body.userPhoneNumber,
    userEmail: req.body.userEmail,
    userFax: req.body.userFax
  }
  UserInformation.create(data, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        err: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          data: data
        })
      }
    }
  })
})

module.exports = router
