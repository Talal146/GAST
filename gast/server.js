var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var passport = require('passport')

// routes that can be accessed without beeing logged in
const allowedRoutes = ['/', '/logout', '/auth/google']

require('dotenv').config()
require('./config/database')
require('./config/passport')


var app = express();
var indexRouter = require('./routes/index')
var studentsRouter = require('./routes/students')
var usersRouter = require('./routes/users')
var homeworkRouter = require('./routes/homeworks')
var app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Authentication Middleware
app.use(function (req, res, next) {
  const user = req.user || null
  res.locals.user = user
  user ||
  allowedRoutes.includes(req.path) ||
  req.path.startsWith('/oauth2callback')
    ? next()
    : res.sendStatus(401)
})

app.use('/', indexRouter)
app.use('/students', studentsRouter)
app.use('/users', usersRouter)
app.use('/homeworks', homeworkRouter)

// Add this middleware BELOW passport middleware

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
