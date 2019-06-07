var mongoose = require('mongoose')
var Schema = mongoose.Schema

var semiProductionProcessRawMaterial = new Schema({
  rawMaterialName: '',
  rawMaterialUnit: '',
  rawMaterialPrice: '',
  rawMaterialNumber: '',
  rawMaterialTotalPrice: '',
  remarks: ''
})

var semiProductionProcess = new Schema({
  semiProductName: String,
  semiProductTotalPrice: String,
  semiProductionProcessRawMaterial: [semiProductionProcessRawMaterial]
}, {
  versionKey: false
})

module.exports = mongoose.model('semiProductionProcess', semiProductionProcess)
