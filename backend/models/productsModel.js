const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Sale'
  },
  name:{
    type: String,
    required: [true, 'Por favor ingrese el nombre del producto']
  },
  description:{
    type: String,
    required: [true, 'Por favor ingresa una descripción']
  },
  cost:{
    type: Number,
    required: [true, 'Por favor ingresa cuanto cuesta el producto']
  },
  sku:{
    type: String,
    required: [true, 'Ingresa el SKU del producto']
  },
  category:{
    type:String,
    required: [true, 'Ingresa la categoria dle producto']
  },
  active:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)