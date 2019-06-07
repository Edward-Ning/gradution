var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productionProcessSemi = new Schema({
  semiProductName: '',
  semiProductUnit: '',
  semiProductUnitPrice: '',
  semiProductNumber: '',
  semiProductTotalPrice: '',
  remarks: ''
})

var productionProcess = new Schema({
  productName: String,
  productTotalPrice: String,
  productionProcessSemi: [productionProcessSemi]
}, {
  versionKey: false
})

module.exports = mongoose.model('productionProcess', productionProcess)
