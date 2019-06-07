var mongoose = require('mongoose')
var Schema = mongoose.Schema

var staffDailyProduction = new Schema({
  staffDPDay: Date,
  deviceNumber: String,
  staffName: String,
  productName: String,
  productSpecification: String,
  productGum: String,
  productUseUnit: String,
  productTotalNumber: String,
  productQualifiedNumber: String,
  staffShift: String,
  productTotal: String,
  remarks: String,
  staffYield: String
}, {
  versionKey: false
})

module.exports = mongoose.model('staffDailyProduction', staffDailyProduction)
