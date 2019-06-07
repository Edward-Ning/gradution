var express = require('express')
var router = express.Router()

var company = require('../models/companyInfomation')

router.get('/', function (req, res, next) {
  res.send('company/')
})

// mongoose.connect('mongodb://localhost:27017/gradb', { useNewUrlParser: true })
//
// mongoose.connection.on('connected', function () {
//   console.log('MongoDB connected success.')
// })
//
// mongoose.connection.on('error', function () {
//   console.log('MongoDB connected fail.')
// })
//
// mongoose.connection.on('disconnected', function () {
//   console.log('MongoDB connected disconnected.')
// })

router.post('/find', function (req, res, next) {
  company.find({}, function (err, doc) {
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

router.post('/change', function (req, res, next) {
  let data = {
    companyName: req.body.companyName,
    companyEmail: req.body.companyEmail,
    companyAddress: req.body.companyAddress,
    companyPhone: req.body.companyPhone,
    companyFax: req.body.companyFax,
    companyAbout: req.body.companyInfo
  }
  company.updateOne({ companyConfirm: '1' }, data, {upsert: true, multi: false}, function (err, rawResponse) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else if (rawResponse) {
      res.json({
        status: '0',
        msg: rawResponse,
        data: data
      })
    }
  })
})

module.exports = router
