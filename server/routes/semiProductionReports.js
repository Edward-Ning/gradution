var express = require('express')
var router = express.Router()

var semiProductionReport = require('../models/semiProductionReport')

router.get('/', function (req, res, next) {
  console.log('123')
  res.send('/semiProductionReport')
})

router.post('/find', function (req, res, next) {
  semiProductionReport.find({}, function (err, doc) {
    let data = doc
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (data) {
        // data[0]['productTotalPrice'] = Number(data[0].productNumber) * Number(data[0].productUnitPrice) + ''
        console.log(data[0])
        res.json({
          result: data
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
    semiProductUseUnit: req.body.semiProductUseUnit,
    orderSemiProductionDate: req.body.orderSemiProductionDate,
    semiProductName: req.body.semiProductName,
    semiProductSpecification: req.body.semiProductSpecification,
    semiProductNumber: req.body.semiProductNumber,
    semiProductGum: req.body.semiProductGum,
    semiProductWeight: req.body.semiProductWeight,
    semiProductUnitPrice: req.body.semiProductUnitPrice,
    semiProductDeliveryDate: req.body.semiProductDeliveryDate,
    semiProductReceiptNumber: req.body.semiProductReceiptNumber,
    semiProductPayBack: req.body.semiProductPayBack,
    remarks: req.body.remarks
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  semiProductionReport.find(data, (err, doc) => {
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
    semiProductUseUnit: req.body.semiProductUseUnit,
    orderSemiProductionDate: req.body.orderSemiProductionDate,
    semiProductName: req.body.semiProductName,
    semiProductSpecification: req.body.semiProductSpecification,
    semiProductNumber: req.body.semiProductNumber,
    semiProductGum: req.body.semiProductGum,
    semiProductWeight: req.body.semiProductWeight,
    semiProductUnitPrice: req.body.semiProductUnitPrice,
    semiProductDeliveryDate: req.body.semiProductDeliveryDate,
    semiProductReceiptNumber: req.body.semiProductReceiptNumber,
    semiProductPayBack: req.body.semiProductPayBack,
    remarks: req.body.remarks,
    _id: req.body._id
  }
  data.semiProductTotalPrice = Number(data.semiProductNumber) * Number(data.semiProductUnitPrice) + ''
  semiProductionReport.update({_id: data._id}, data, function (err, doc) {
    if (err) {
      res.json({
        status: '1'
      })
    } else if (doc) {
      res.json({
        status: '0',
        res: doc
      })
    }
  })
})

router.post('/delete', function (req, res, next) {
  let data = {
    _id: req.body._id
  }
  semiProductionReport.deleteOne({_id: data._id}, function (err, response) {
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
    semiProductUseUnit: req.body.semiProductUseUnit,
    orderSemiProductionDate: req.body.orderSemiProductionDate,
    semiProductName: req.body.semiProductName,
    semiProductSpecification: req.body.semiProductSpecification,
    semiProductNumber: req.body.semiProductNumber,
    semiProductGum: req.body.semiProductGum,
    semiProductWeight: req.body.semiProductWeight,
    semiProductUnitPrice: req.body.semiProductUnitPrice,
    semiProductDeliveryDate: req.body.semiProductDeliveryDate,
    semiProductReceiptNumber: req.body.semiProductReceiptNumber,
    semiProductPayBack: req.body.semiProductPayBack,
    remarks: req.body.remarks
  }
  data.semiProductTotalPrice = Number(data.semiProductNumber) * Number(data.semiProductUnitPrice) + ''
  semiProductionReport.create(data, (err, doc) => {
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
