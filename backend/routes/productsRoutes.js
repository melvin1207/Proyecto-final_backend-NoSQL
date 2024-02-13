const express = require('express')
const router = express.Router()
const { getProduct, createProduct, updateProduct, softDeleteProduct, deleteProduct } = require('../controllers/salesControllers') 
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getProduct)
router.post('/', protect, createProduct)
router.options('/:id', protect, updateProduct)
router.delete('/:id', protect, softDeleteProduct)
router.delete('/:id', protect, deleteProduct)

module.exports = router
