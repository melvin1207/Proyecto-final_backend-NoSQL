const express = require('express')
const router = express.Router()
const { createCustomer } = require('../controllers/customersControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', createCustomer)

module.exports = router