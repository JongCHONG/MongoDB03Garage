const mongoose = require('mongoose')

const garageSchema = new mongoose.Schema({
  name:{
    type: String
  }
})
const Garage = mongoose.model('Garage', garageSchema)

module.exports = Garage