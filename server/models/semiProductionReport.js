var mongoose = require('mongoose')
var Schema = mongoose.Schema

var semiProductionReport = new Schema({
  semiProductUseUnit: String,
  orderSemiProductionDate: Date,
  semiProductName: String,
  semiProductSpecification: String,
  semiProductNumber: String,
  semiProductGum: String,
  semiProductWeight: String,
  semiProductUnitPrice: String,
  semiProductTotalPrice: String,
  semiProductDeliveryDate: String,
  semiProductReceiptNumber: String,
  semiProductPayBack: String,
  remarks: String
}, {
  versionKey: false
})

module.exports = mongoose.model('semiProductionReport', semiProductionReport)
