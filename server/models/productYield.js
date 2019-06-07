var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productYield = new Schema({
  productName: String,
  productYield: String
}, {
  versionKey: false
})

module.exports = mongoose.model('productYield', productYield)
