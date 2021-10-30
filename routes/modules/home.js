const express = require('express')
const router = express.Router()

const moment = require('moment')

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record
    .find()
    .lean()
    .then(records => {
      records.forEach(record => {
        record.date = moment(record.date).format('YYYY-MM-DD')
      })
      res.render('index', { records })
    })
    .catch(err => console.error(err))
})

module.exports = router
