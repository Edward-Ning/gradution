var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userOrderInformation = new Schema({
  productUseUnit: String,
  userName: String,
  productName: String,
  productSpecification: String,
  productNumber: String,
  productGum: String,
  productWeight: String,
  productUnitPrice: String,
  productTotalPrice: String,
  productExpectedDeliveryDate: String,
  productDeliveryDate: String,
  productState: String,
  productUnitCost: String
}, {
  versionKey: false
})

module.exports = mongoose.model('userOrderInformation', userOrderInformation)
