var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userInformations = new Schema({
  userName: String,
  userPwd: String,
  userCompanyName: String,
  userCompanyAddress: String,
  userPhoneNumber: String,
  userEmail: String,
  userFax: String,
  userPermission: String
}, {
  versionKey: false
})

module.exports = mongoose.model('userInformation', userInformations)
