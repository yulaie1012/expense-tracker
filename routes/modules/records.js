const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
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
    .then(record => res.render('edit', { record }))
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id

  Record
    .findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
