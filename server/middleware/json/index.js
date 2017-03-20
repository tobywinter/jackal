'use strict'

const json = (req, res, next) => {
  res.set({ 'Content-Type': 'application/json' })

  next()
}

module.exports = json
