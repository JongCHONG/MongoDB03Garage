const express = require("express")
const app = express()

const Car = require("../models/car")

app.get('/', async (req, res) => {
  try {
    const cars = await Car.find({})

    res.json(cars)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

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