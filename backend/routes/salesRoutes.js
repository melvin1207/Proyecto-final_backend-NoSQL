const express = require('express')
const router = express.Router()
const { createSale, getSales, updateSale, softDeleteSale, destroySale } = require('../controllers/salesControllers')
const { protect } = require('../middleware/authMiddleware')
const { saleProtect } = require('../middleware/salesMiddleware')

router.post('/:id', protect, createSale)
router.get('/', protect, getSales)
router.patch('/:id', protect, saleProtect, updateSale)
router.delete('/:id', protect, softDeleteSale)
router.delete('/destroy/:id', protect, destroySale)

module.exports = router