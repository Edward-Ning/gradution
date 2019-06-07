var mongoose = require('mongoose')
var Schema = mongoose.Schema

var deviceInformation = new Schema({
  deviceNumber: String,
  deviceName: String,
  deviceModel: String,
  devicePower: String,
  deviceManufactureDate: String
}, {
  versionKey: false
})

module.exports = mongoose.model('deviceInformation', deviceInformation)
