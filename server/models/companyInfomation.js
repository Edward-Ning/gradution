var mongoose = require('mongoose')
var Schema = mongoose.Schema

var companyInformationSchema = new Schema({
  companyConfirm: String,
  companyName: String,
  companyEmail: String,
  companyAddress: String,
  companyPhone: String,
  companyFax: String,
  companyAbout: String
}, {
  versionKey: false
})

module.exports = mongoose.model('companyInformations', companyInformationSchema)
