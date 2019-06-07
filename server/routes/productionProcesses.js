var express = require('express')
var router = express.Router()

var productionProcess = require('../models/productionProcess')
var productYield = require('../models/productYield')

router.get('/', function (req, res, next) {
  res.send('productionProcess/')
})

router.post('/find', function (req, res, next) {
  productionProcess.find({}, function (err, doc) {
    if (err) {
      console.log('1')
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        console.log('0')
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
    productName: req.body.productName
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  productionProcess.find(data, (err, doc) => {
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

router.post('/add', function (req, res, next) {
  productionProcess.create({
    productName: req.body.productName,
    productionProcessSemi: []
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        err: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '0'
        })
      }
    }
  })
})

router.post('/addSemi', function (req, res, next) {
  let semiProductTotalPrice = String(Number(req.body.semiProductUnitPrice) * Number(req.body.semiProductNumber))
  let data = {
    semiProductName: req.body.semiProductName,
    semiProductUnit: req.body.semiProductUnit,
    semiProductUnitPrice: req.body.semiProductUnitPrice,
    semiProductNumber: req.body.semiProductNumber,
    semiProductTotalPrice: semiProductTotalPrice,
    remarks: req.body.remarks,
    product_id: req.body.product_id
  }
  console.log(data)
  productionProcess.findByIdAndUpdate(data.product_id,
    {$push: {'productionProcessSemi': data}},
    {safe: true, upsert: true},
    (err, doc) => {
      if (err) {
        res.json({
          status: '1'
        })
      } else {
        if (doc) {
          res.json({
            status: '0'
          })
        }
      }
    })
})

router.post('/edit', function (req, res, next) {
  let data = {
    productName: req.body.productName,
    _id: req.body._id
  }
  productionProcess.update({_id: data._id}, data, function (err, response) {
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
  productionProcess.deleteOne({_id: data._id}, function (err, response) {
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

router.post('/deleteSemi', function (req, res, next) {
  let data = {
    product_id: req.body.product_id
  }
  console.log(data)
  productionProcess.findByIdAndUpdate(data.product_id,
    {$pull: {'productionProcessSemi': {_id: req.body._id}}},
    (err, doc) => {
      if (err) {
        res.json({
          status: '1'
        })
      } else {
        if (doc) {
          res.json({
            status: '0'
          })
        }
      }
    })
})

router.post('/editSemi', function (req, res, next) {
  let semiProductTotalPrice = String(Number(req.body.semiProductUnitPrice) * Number(req.body.semiProductNumber))
  let data = {
    'productionProcessSemi.$.semiProductName': req.body.semiProductName,
    'productionProcessSemi.$.semiProductUnit': req.body.semiProductUnit,
    'productionProcessSemi.$.semiProductUnitPrice': req.body.semiProductUnitPrice,
    'productionProcessSemi.$.semiProductNumber': req.body.semiProductNumber,
    'productionProcessSemi.$.semiProductTotalPrice': semiProductTotalPrice,
    'productionProcessSemi.$.remarks': req.body.remarks
  }
  console.log(data)
  productionProcess.update({
    'productionProcessSemi._id': req.body._id
  }, {'$set': data}, function (err, response) {
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

router.post('/calculate', function (req, res, next) {
  productionProcess.find({_id: req.body._id}, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        let productProcess = doc
        productYield.find({}, (err, doc) => {
          if (err) {
            res.json({
              status: '1'
            })
          } else {
            let semiProductYield = doc
            let ProductTotalPrice = calculate(productProcess, semiProductYield)
            console.log('ProductTotalPrice' + ProductTotalPrice)
            productionProcess.findOneAndUpdate({_id: req.body._id}, {productTotalPrice: ProductTotalPrice}, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, doc) => {
              productionProcess.find({}, function (err, doc) {
                if (err) {
                  console.log('1')
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
          }
        })
      }
    }
  })
})

function calculate (productProcess, semiProductYield) {
  let sum = 0
  for (let i = 0; i < productProcess[0].productionProcessSemi.length; i++) {
    for (let j = 0; j < semiProductYield.length; j++) {
      console.log('semiProductName:' + productProcess[0].productionProcessSemi[i].semiProductName)
      if (productProcess[0].productionProcessSemi[i].semiProductName === semiProductYield[j].productName) {
        productProcess[0].productionProcessSemi[i].semiProductNumber = String(Number(Math.round(Number(productProcess[0].productionProcessSemi[i].semiProductNumber) / Number(semiProductYield[j].productYield) * 100) / 100))
      }
    }
    sum = sum + Number(productProcess[0].productionProcessSemi[i].semiProductNumber) * Number(productProcess[0].productionProcessSemi[i].semiProductUnitPrice)
  }
  return String(sum)
}

module.exports = router
