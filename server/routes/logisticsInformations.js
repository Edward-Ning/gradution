var express = require('express')
var router = express.Router()

var logisticsInformation = require('../models/logisticsInformation')

router.get('/', function (req, res, next) {
  res.send('deviceInformation/')
})

router.post('/find', function (req, res, next) {
  logisticsInformation.find({}, function (err, doc) {
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
    logisticsDeparture: req.body.logisticsDeparture,
    logisticsDestination: req.body.logisticsDestination,
    logisticsCompany: req.body.logisticsCompany,
    logisticsWay: req.body.logisticsWay,
    logisticsDepartureDate: req.body.logisticsDepartureDate,
    logisticsPrice: req.body.logisticsPrice
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  logisticsInformation.find(data, (err, doc) => {
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
    logisticsDeparture: req.body.logisticsDeparture,
    logisticsDestination: req.body.logisticsDestination,
    logisticsCompany: req.body.logisticsCompany,
    logisticsWay: req.body.logisticsWay,
    logisticsDepartureDate: req.body.logisticsDepartureDate,
    logisticsPrice: req.body.logisticsPrice,
    _id: req.body._id
  }
  logisticsInformation.update({_id: data._id}, data, function (err, response) {
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
  logisticsInformation.deleteOne({_id: data._id}, function (err, response) {
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
    staffDPDay: req.body.staffDPDay,
    logisticsDeparture: req.body.logisticsDeparture,
    logisticsDestination: req.body.logisticsDestination,
    logisticsCompany: req.body.logisticsCompany,
    logisticsWay: req.body.logisticsWay,
    logisticsDepartureDate: req.body.logisticsDepartureDate,
    logisticsPrice: req.body.logisticsPrice
  }
  logisticsInformation.create(data, (err, doc) => {
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
