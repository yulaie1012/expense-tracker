const express = require('express')
const router = express.Router()

const moment = require('moment')

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id

  return Record
    .find({ userId })
    .lean()
    .populate('categoryId')
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
      return res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})

router.get('/search', (req, res) => {
  const category = req.query.category

  if (category === '') {
    return res.redirect('/')
  }

  const userId = req.user._id

  return Category
    .findOne({ name: category })
    .then(category => category._id)
    .then(categoryId => {
      Record
        .find({ userId, categoryId })
        .lean()
        .populate('categoryId')
        .sort({ date: 'asc' })
        .then(records => {
          let totalAmount = 0
          records.forEach(record => {
            record.date = moment(record.date).format('YYYY-MM-DD')
            totalAmount += record.amount
          })
          return res.render('index', { records, totalAmount, category })
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

module.exports = router
