const express = require('express')
const router = express.Router()
const { getProduct, createProduct, updateProduct, softDeleteProduct, destroyProduct } = require('../controllers/productsControllers') 
const { protect } = require('../middleware/authMiddleware')

router.post('/:id', protect, createProduct)
router.get('/:id', protect, getProduct)
router.patch('/:id', protect, updateProduct)
router.patch('/:id', protect, softDeleteProduct)
router.delete('/:id', protect, destroyProduct)

module.exports = router
