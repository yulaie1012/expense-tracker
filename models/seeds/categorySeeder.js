if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')

const db = require('../../config/mongoose')

const SEED_CATEGORIES = [
  {
    name: '家居物業',
    icon: 'fas fa-home'
  },
  {
    name: '交通出行',
    icon: 'fas fa-shuttle-van'
  },
  {
    name: '休閒娛樂',
    icon: 'fas fa-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fas fa-utensils'
  },
  {
    name: '其他',
    icon: 'fas fa-pen'
  }
]

db.once('open', () => {
  Promise
    .all(Array.from(
      SEED_CATEGORIES,
      SEED_CATEGORY => Category.create(SEED_CATEGORY)
    ))
    .then(() => {
      console.log('SEED_CATEGORIES is done.')
      process.exit()
    })
    .catch(err => console.error(err))
})
