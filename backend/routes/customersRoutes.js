const express = require('express')
const router = express.Router()
const { createCustomer, loginCustomer, datosCustomer, updateCustomer, softDeleteCustomer, destroyCustomer } = require('../controllers/customersControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', createCustomer)
router.post('/login', loginCustomer)
router.get('/datos', protect, datosCustomer)
router.patch('/:id', protect, updateCustomer)
router.delete('/:id', protect, softDeleteCustomer)
router.delete('/destroy/:id', protect, destroyCustomer)

module.exports = router