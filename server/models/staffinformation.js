var mongoose = require('mongoose')
var Schema = mongoose.Schema

var staffInformationSchema = new Schema({
  staffNumber: String,
  staffName: String,
  staffGender: String,
  staffAge: String,
  staffEntryYear: String
}, {
  versionKey: false
})

module.exports = mongoose.model('staffInformation', staffInformationSchema)
