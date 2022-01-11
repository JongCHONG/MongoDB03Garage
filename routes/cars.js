const express = require("express")
const app = express()

const Car = require("../models/car")

app.post('/', async (req, res) => {
  const car = new Car({
    ...req.body
  })
  car.save((err, car) => {
    if (err) {
      res.status(500).json({ error: err })
      return
    }

    res.json(car)
  })
})

module.exports = app