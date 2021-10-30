if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Record = require('../record')

const db = require('../../config/mongoose')

const SEED_RECORDS = [
  {
    name: '午餐',
    date: '2021-10-28',
    amount: 60,
    category: '餐飲食品',
    user: '廣志'
  },
  {
    name: '晚餐',
    date: '2021-10-27',
    amount: 60,
    category: '餐飲食品',
    user: '廣志'
  },
  {
    name: '捷運',
    date: '2021-10-26',
    amount: 120,
    category: '交通出行',
    user: '廣志'
  },
  {
    name: '電影：驚奇隊長',
    date: '2021-10-25',
    amount: 220,
    category: '休閒娛樂',
    user: '小新'
  },
  {
    name: '租金',
    date: '2021-10-01',
    amount: 25000,
    category: '家居物業',
    user: '廣志'
  }
]

db.once('open', () => {
  Promise
    .all(Array.from(
      SEED_RECORDS,
      SEED_RECORD => {
        return User
          .findOne({ name: SEED_RECORD.user })
          .then(user => user._id)
          .then(userId => Record.create({ ...SEED_RECORD, userId }))
          .catch(err => console.error(err))
      }
    ))
    .then(() => {
      console.log('SEED_RECORDS is done.')
      process.exit()
    })
    .catch(err => console.error(err))
})
