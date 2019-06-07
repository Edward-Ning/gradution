var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productionReport = new Schema({
  productUseUnit: String,
  orderProductionDate: Date,
  productName: String,
  productSpecification: String,
  productNumber: String,
  productGum: String,
  productWeight: String,
  productUnitPrice: String,
  productTotalPrice: String,
  productDeliveryDate: String,
  productReceiptNumber: String,
  productPayBack: String,
  remarks: String
}, {
  versionKey: false
})

module.exports = mongoose.model('productionReport', productionReport)
