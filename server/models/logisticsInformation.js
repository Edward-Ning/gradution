var mongoose = require('mongoose')
var Schema = mongoose.Schema

var logisticsInformation = new Schema({
  logisticsDeparture: String,
  logisticsDestination: String,
  logisticsCompany: String,
  logisticsWay: String,
  logisticsDepartureDate: String,
  logisticsPrice: String
}, {
  versionKey: false
})

module.exports = mongoose.model('logisticsInformation', logisticsInformation)
