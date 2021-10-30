const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')

const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '1234'
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '1234'
  }
]

db.once('open', () => {
  Promise
    .all(Array.from(
      SEED_USERS,
      SEED_USER => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          }))
      }
    ))
    .then(() => {
      console.log('SEED_USERS is done.')
      process.exit()
    })
    .catch(err => console.error(err))
})
