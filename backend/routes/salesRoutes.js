const express = require('express')
const router = express.Router()
const { createSale, getSales, updateSale, softDeleteSale, destroySale } = require('../controllers/salesControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createSale)
router.get('/get', protect, getSales)
router.patch('/:id', protect, updateSale)
router.delete('/:id', protect, softDeleteSale)
router.delete('/destroy/:id', protect, destroySale)

module.exports = router