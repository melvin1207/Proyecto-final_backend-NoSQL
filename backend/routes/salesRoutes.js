const express = require('express')
const router = express.Router()
const { createSale, datosSale, updateSale, softDeleteSale, destroySale } = require('../controllers/salesControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createSale)
router.get('/datos', protect, datosSale)
router.patch('/:id', protect, updateSale)
router.delete('/:id', protect, softDeleteSale)
router.delete('/destroy/:id', protect, destroySale)

module.exports = router