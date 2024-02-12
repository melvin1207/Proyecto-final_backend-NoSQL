const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getProducts)
router.post('/', protect, createProducts)

router.options('/:id', protect, updateProducts)
router.delete('/:id', protect, deleteProducts)

module.exports = router
