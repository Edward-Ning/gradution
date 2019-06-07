var express = require('express')
var router = express.Router()

var semiProductionProcess = require('../models/semiProductionProcess')

router.get('/', function (req, res, next) {
  res.send('semiProductionProcess/')
})

router.post('/find', function (req, res, next) {
  semiProductionProcess.find({}, function (err, doc) {
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
    semiProductName: req.body.semiProductName
  }
  deleteEmptyString(data, true)
  console.log(data)
  deleteEmptyObject(data, true)
  console.log(data)
  semiProductionProcess.find(data, (err, doc) => {
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
  semiProductionProcess.create({
    semiProductName: req.body.semiProductName,
    semiProductionProcessRawMaterial: []
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        err: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
        })
      }
    }
  })
})

router.post('/addRaw', function (req, res, next) {
  let rawMaterialTotalPrice = String(Number(req.body.rawMaterialPrice) * Number(req.body.rawMaterialNumber))
  let data = {
    rawMaterialName: req.body.rawMaterialName,
    rawMaterialUnit: req.body.rawMaterialUnit,
    rawMaterialPrice: req.body.rawMaterialPrice,
    rawMaterialNumber: req.body.rawMaterialNumber,
    rawMaterialTotalPrice: rawMaterialTotalPrice,
    remarks: req.body.remarks,
    semi_id: req.body.semi_id
  }
  semiProductionProcess.findByIdAndUpdate(data.semi_id,
    {$push: {'semiProductionProcessRawMaterial': data}},
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
    semiProductName: req.body.semiProductName,
    _id: req.body._id
  }
  semiProductionProcess.update({_id: data._id}, data, function (err, response) {
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
  semiProductionProcess.deleteOne({_id: data._id}, function (err, response) {
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
    semiProductName: req.body.semiProductName
  }
  semiProductionProcess.create(data, (err, doc) => {
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

router.post('/deleteRaw', function (req, res, next) {
  let data = {
    semiProduct_id: req.body.semiProduct_id
  }
  console.log(data)
  semiProductionProcess.findByIdAndUpdate(data.semiProduct_id,
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

router.post('/editRaw', function (req, res, next) {
  let rawMaterialTotalPrice = String(Number(req.body.rawMaterialPrice) * Number(req.body.rawMaterialNumber))
  let data = {
    'semiProductionProcessRawMaterial.$.rawMaterialName': req.body.rawMaterialName,
    'semiProductionProcessRawMaterial.$.rawMaterialUnit': req.body.rawMaterialUnit,
    'semiProductionProcessRawMaterial.$.rawMaterialPrice': req.body.rawMaterialPrice,
    'semiProductionProcessRawMaterial.$.rawMaterialNumber': req.body.rawMaterialNumber,
    'semiProductionProcessRawMaterial.$.rawMaterialTotalPrice': rawMaterialTotalPrice,
    'semiProductionProcessRawMaterial.$.remarks': req.body.remarks
  }
  console.log(data)
  semiProductionProcess.update({
    'semiProductionProcessRawMaterial._id': req.body._id
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
  semiProductionProcess.find({_id: req.body._id}, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      if (doc) {
        console.log(doc)
        let data = doc
        let semiProductTotalPrice = calculate(data)
        semiProductionProcess.findOneAndUpdate({_id: req.body._id}, {semiProductTotalPrice: semiProductTotalPrice}, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, doc) => {
          semiProductionProcess.find({}, function (err, doc) {
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
      } else {
        console.log('0')
        res.json({
          status: '0',
          semiProductTotalPrice: '0'
        })
      }
    }
  })
})

function calculate (data) {
  let a = data[0].semiProductionProcessRawMaterial
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum = sum + Number(a[i].rawMaterialTotalPrice)
  }
  console.log(sum)
  return String(sum)
}

module.exports = router
