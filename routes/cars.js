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
  const newCar = new Car({
    ...req.body
  })
  newCar.save((err, newCar) => {
    if (err) {
      res.status(500).json({ error: err })
      return
    }

    res.json(newCar)
  })
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Car.deleteOne({ _id: id }).exec()
    res.status(200).json({ success: "Car deleted" })
  } catch(err) {
    res.status(500).json({ error: err })
  }
})

module.exports = app