const express = require("express")
const app = express()

const Garage = require("../models/garage")


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