const express = require('express')
const router = express.Router()

const moment = require('moment')

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id

  Record
    .find({ userId })
    .lean()
    .sort({ _id: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})

module.exports = router
