var express = require('express')
var router = express.Router()

var userOrderInformation = require('../models/userOrderInformation')
var userInformation = require('../models/userInformation')

router.get('/', function (req, res, next) {
  console.log('123')
  res.send('/productionReport')
})

router.post('/find', function (req, res, next) {
  userOrderInformation.find({}, (err, doc) => {
    let data = doc
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (data) {
        // data[0]['productTotalPrice'] = Number(data[0].productNumber) * Number(data[0].productUnitPrice) + ''
        res.json({
          result: data
        })
      }
    }
  })
})

router.post('/userFind', function (req, res, next) {
  let data = {
    userName: req.body.userName
  }
  userOrderInformation.find(data, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      res.json({
        result: doc
      })
    }
  })
})

router.post('/addUserOrder', function (req, res, next) {
  let data = {
    userName: req.body.userName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productExpectedDeliveryDate: req.body.productExpectedDeliveryDate,
    productState: req.body.productState
  }
  userInformation.find({userName: data.userName}, (err, doc) => {
    addUserOrder(doc, data, res)
  })
})

function addUserOrder (doc, data, res) {
  console.log('adduserorder')
  console.log(doc)
  console.log(data)
  data.productUseUnit = doc[0].userCompanyName
  userOrderInformation.create(data, (err, doc) => {
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
}

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
    userName: req.body.userName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productUnitPrice: req.body.productUnitPrice,
    productExpectedDeliveryDate: req.body.productExpectedDeliveryDate,
    productDeliveryDate: req.body.productDeliveryDate,
    productState: req.body.productState
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  userOrderInformation.find(data, (err, doc) => {
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
    userName: req.body.userName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productUnitPrice: req.body.productUnitPrice,
    productExpectedDeliveryDate: req.body.productExpectedDeliveryDate,
    productDeliveryDate: req.body.productDeliveryDate,
    productState: req.body.productState,
    _id: req.body._id
  }
  data.productTotalPrice = Number(data.productNumber) * Number(data.productUnitPrice) + ''
  userOrderInformation.update({_id: data._id}, data, function (err, doc) {
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
  userOrderInformation.deleteOne({_id: data._id}, function (err, response) {
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
    userName: req.body.userName,
    productName: req.body.productName,
    productSpecification: req.body.productSpecification,
    productNumber: req.body.productNumber,
    productGum: req.body.productGum,
    productWeight: req.body.productWeight,
    productUnitPrice: req.body.productUnitPrice,
    productExpectedDeliveryDate: req.body.productExpectedDeliveryDate,
    productDeliveryDate: req.body.productDeliveryDate,
    productState: req.body.productState
  }
  data.productTotalPrice = Number(data.productNumber) * Number(data.productUnitPrice) + ''
  userOrderInformation.create(data, (err, doc) => {
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
