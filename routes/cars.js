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

app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const car = await Car.findOne({ id: id })

    res.json(car)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

app.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const car = await Car.findOneAndUpdate(
      { id: id }, 
      { $set: { ...req.body } },
      { new: true }
    )

    res.json(car)
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