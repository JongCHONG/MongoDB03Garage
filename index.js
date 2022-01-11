const express = require("express")
const app = express()
const port = 5000
const { dbConnect } = require("./config/db")

const carsRoutes = require("./routes/cars")

dbConnect()

app.use(express.json())

app.use('/cars', carsRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})