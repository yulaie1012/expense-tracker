const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: { isEqual: (a, b) => a === b }
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
