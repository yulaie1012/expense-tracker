const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
