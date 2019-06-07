var express = require('express')
var router = express.Router()

var staffDailyProductions = require('../models/staffdailyproduction')
var productYield = require('../models/productYield')

router.get('/', function (req, res, next) {
  res.send('staffDailyProduction/')
})

router.post('/find', function (req, res, next) {
  staffDailyProductions.find({}, function (err, doc) {
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

router.post('/findStaffYield', function (req, res, next) {
  let data = {
    startDate: new Date(req.body.dateRange[0]),
    endDate: new Date(req.body.dateRange[1]),
    staffName: req.body.staffName,
    productName: req.body.productName
  }
  let test = {
    staffDPDay: {$gte: data.startDate, $lte: data.endDate},
    staffName: data.staffName,
    productName: data.productName
  }
  deleteEmptyString(test, true)
  deleteEmptyObject(test, true)
  staffDailyProductions.find(test, function (err, doc) {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        console.log(doc)
        res.json({
          result: doc
        })
      }
    }
  })
})

function isEmpty (obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
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
    staffDPDay: req.body.staffDPDay,
    deviceNumber: req.body.deviceNumber,
    staffName: req.body.staffName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productGum: req.body.productGum,
    productUseUnit: req.body.productUseUnit,
    productTotalNumber: req.body.productTotalNumber,
    productQualifiedNumber: req.body.productQualifiedNumber,
    staffShift: req.body.staffShift,
    productTotal: req.body.productTotal,
    remarks: req.body.remarks
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  staffDailyProductions.find(data, (err, doc) => {
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
    staffDPDay: req.body.staffDPDay,
    deviceNumber: req.body.deviceNumber,
    staffName: req.body.staffName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productGum: req.body.productGum,
    productUseUnit: req.body.productUseUnit,
    productTotalNumber: req.body.productTotalNumber,
    productQualifiedNumber: req.body.productQualifiedNumber,
    staffShift: req.body.staffShift,
    productTotal: req.body.productTotal,
    remarks: req.body.remarks,
    _id: req.body._id
  }
  console.log(data)
  data.staffYield = String(Math.round((Number(data.productTotalNumber) / Number(data.productQualifiedNumber)) * 100) / 100)
  staffDailyProductions.update({_id: data._id}, data, function (err, response) {
    if (err) {
      res.json({
        status: '1'
      })
    } else if (response) {
      createProductYield(data)
      res.json({
        status: '0',
        res: response
      })
    }
  })
})

router.post('/delete', function (req, res, next) {
  let data = {
    _id: req.body._id,
    productName: req.body.productName
  }
  console.log(data)
  staffDailyProductions.deleteOne({_id: data._id}, function (err, response) {
    if (err) {
      res.json({
        status: '1'
      })
    } else if (response) {
      createProductYield(data)
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
    deviceNumber: req.body.deviceNumber,
    staffName: req.body.staffName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productGum: req.body.productGum,
    productUseUnit: req.body.productUseUnit,
    productTotalNumber: req.body.productTotalNumber,
    productQualifiedNumber: req.body.productQualifiedNumber,
    staffShift: req.body.staffShift,
    productTotal: req.body.productTotal,
    remarks: req.body.remarks
  }
  console.log('staffDPDay:')
  console.log(data.staffDPDay)
  data.staffYield = String(Math.round((Number(data.productTotalNumber) / Number(data.productQualifiedNumber)) * 100) / 100)
  staffDailyProductions.create(data, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        err: err.message
      })
    } else {
      if (doc) {
        createProductYield(data)
        res.json({
          status: '0',
          data: data
        })
      }
    }
  })
})

function createProductYield (data) {
  staffDailyProductions.find({productName: data.productName}, function (err, doc) {
    let data2 = doc
    let sum = 0
    for (let i = 0; i < data2.length; i++) {
      sum = sum + Number(data2[i].staffYield)
    }
    console.log('data2')
    console.log(data2)
    console.log(sum)
    let productYieldAverage = String(Math.round(sum / data2.length * 1000) / 1000)
    console.log(productYieldAverage)
    productYield.findOneAndUpdate({productName: data.productName}, {productName: data.productName, productYield: productYieldAverage}, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, doc) => {})
  })
}

module.exports = router
