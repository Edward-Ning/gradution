var mongoose = require('mongoose')
var Schema = mongoose.Schema

var rawMaterialInformation = new Schema({
  rawMaterialName: String,
  rawMaterialUnit: String,
  rawMaterialPrice: String,
  staffName: String,
  rawMaterialOutDate: String,
  rawMaterialOutNumber: String,
  rawMaterialMargin: String
}, {
  versionKey: false
})

module.exports = mongoose.model('rawMaterialInformation', rawMaterialInformation)
