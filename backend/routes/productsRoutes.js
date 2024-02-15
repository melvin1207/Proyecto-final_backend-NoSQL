const express = require('express')
const router = express.Router()
const { getProduct, createProduct, updateProduct, softDeleteProduct, destroyProduct } = require('../controllers/productsControllers') 
const { protect } = require('../middleware/authMiddleware')
const { isAdminProtect } = require('../middleware/isAdminMiddleware')

router.post('/', protect, isAdminProtect, createProduct)
router.get('/:id', protect, getProduct)
router.patch('/:id', protect, isAdminProtect, updateProduct)
router.patch('/:id', protect, isAdminProtect, softDeleteProduct)
router.delete('/:id', protect, isAdminProtect, destroyProduct)

module.exports = router
