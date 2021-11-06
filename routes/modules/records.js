const express = require('express')
const router = express.Router()

const moment = require('moment')

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  const todayDate = moment().format('YYYY-MM-DD')

  return res.render('new', { todayDate })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const category = req.body.category

  return Category
    .findOne({ name: category })
    .then(category => category._id)
    .then(categoryId => {
      Record
        .create({ ...req.body, userId, categoryId })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record
    .findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      return res.render('edit', { record })
    })
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record
    .findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record
    .findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
