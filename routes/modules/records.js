const express = require('express')
const router = express.Router()

const moment = require('moment')

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  const todayDate = moment().format('YYYY-MM-DD')

  res.render('new', { todayDate })
})

router.post('/', (req, res) => {
  Record
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id

  Record
    .findOne({ _id })
    .lean()
    .then(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id

  Record
    .findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id

  Record
    .findOneAndDelete({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
