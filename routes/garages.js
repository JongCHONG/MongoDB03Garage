const express = require("express")
const app = express()

const Garage = require("../models/garage")
const Car = require("../models/car")

app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const garage = await Garage.findOne({ _id: id }).lean()
    const cars = await Car.find({ garage_id: garage._id })

    const garageCars = {
      ...garage,
      cars
    }
    //populate à regarder dans la correction

    res.json(garageCars)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

app.post('/', async (req, res) => {
  const newGarage = new Garage({
    ...req.body
  })
  newGarage.save((err, newGarage) => {
    if (err) {
      res.status(500).json({ error: err })
      return
    }

    res.json(newGarage)
  })
})

module.exports = app