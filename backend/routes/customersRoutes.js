const express = require('express')
const router = express.Router()
const { createCustomer, loginCustomer, datosCustomer, updateCustomer, softDeleteCustomer, destroyCustomer } = require('../controllers/customersControllers')
const { protect } = require('../middleware/authMiddleware')
const { customerProtect } = require('../middleware/customerMiddleware')

router.post('/', createCustomer)
router.post('/login', loginCustomer)
router.get('/datos', protect, datosCustomer)
router.patch('/:id', protect, customerProtect, updateCustomer)
router.delete('/:id', protect, customerProtect, softDeleteCustomer)
router.delete('/destroy/:id', protect, customerProtect, destroyCustomer)

module.exports = router