const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}), (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please complete all required fields.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password does not match.' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User
    .findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'The Email is already registered.' })
        res.render('register', { errors, name, email, password, confirmPassword })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({ name, email, password: hash }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.error(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You\'ve been logged out.')
  res.redirect('/users/login')
})

module.exports = router
