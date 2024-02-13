const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/customers', require('./routes/customersRoutes'))
app.use('/api/sales', require('./routes/salesRoutes'))
app.use('/api/products', require('./routes/salesRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))