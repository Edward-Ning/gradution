var express = require('express')
var router = express.Router()

var productionReport = require('../models/productionReport')

router.get('/', function (req, res, next) {
  console.log('123')
  res.send('/productionReport')
})

router.post('/find', function (req, res, next) {
  productionReport.find({}, function (err, doc) {
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
    productUseUnit: req.body.productUseUnit,
    orderProductionDate: req.body.orderProductionDate,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productUnitPrice: req.body.productUnitPrice,
    productDeliveryDate: req.body.productDeliveryDate,
    productReceiptNumber: req.body.productReceiptNumber,
    productPayBack: req.body.productPayBack,
    remarks: req.body.remarks
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  productionReport.find(data, (err, doc) => {
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
    productUseUnit: req.body.productUseUnit,
    orderProductionDate: req.body.orderProductionDate,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productUnitPrice: req.body.productUnitPrice,
    productDeliveryDate: req.body.productDeliveryDate,
    productReceiptNumber: req.body.productReceiptNumber,
    productPayBack: req.body.productPayBack,
    remarks: req.body.remarks,
    _id: req.body._id
  }
  data.productTotalPrice = Number(data.productNumber) * Number(data.productUnitPrice) + ''
  productionReport.update({_id: data._id}, data, function (err, doc) {
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
  productionReport.deleteOne({_id: data._id}, function (err, response) {
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
    productUseUnit: req.body.productUseUnit,
    orderProductionDate: req.body.orderProductionDate,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productUnitPrice: req.body.productUnitPrice,
    productDeliveryDate: req.body.productDeliveryDate,
    productReceiptNumber: req.body.productReceiptNumber,
    productPayBack: req.body.productPayBack,
    remarks: req.body.remarks
  }
  data.productTotalPrice = Number(data.productNumber) * Number(data.productUnitPrice) + ''
  productionReport.create(data, (err, doc) => {
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
