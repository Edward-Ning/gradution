var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
// var ejs = require('ejs')

var index = require('./routes/index')
var userInformation = require('./routes/userInformations')
var companyInformations = require('./routes/companyInformations')
var staffInformation = require('./routes/staffInformations')
var staffDailyProduction = require('./routes/staffDailyProductions')
var productionReport = require('./routes/productionReports')
var semiProductionReport = require('./routes/semiProductionReports')
var deviceInformation = require('./routes/deviceInformations')
var userOrderInformation = require('./routes/userOrderInformations')
var logisticsInformation = require('./routes/logisticsInformations')
var rawMaterialInformation = require('./routes/rawMaterialInformations')
var semiProductionProcesses = require('./routes/semiProductionProcesses')
var productionProcesses = require('./routes/productionProcesses')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
// app.engine('.html', ejs.__express)
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/userInformation', userInformation)
app.use('/companyInformation', companyInformations)
app.use('/staffInformation', staffInformation)
app.use('/staffDailyProduction', staffDailyProduction)
app.use('/productionReport', productionReport)
app.use('/semiProductionReport', semiProductionReport)
app.use('/deviceInformation', deviceInformation)
app.use('/userOrderInformation', userOrderInformation)
app.use('/logisticsInformation', logisticsInformation)
app.use('/rawMaterialInformation', rawMaterialInformation)
app.use('/semiProductionProcess', semiProductionProcesses)
app.use('/productionProcess', productionProcesses)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
