const mongoose = require('mongoose')

const saleSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    order_number:{
        type: Number,
        required: [true, 'Por favor ingrese el numero de orden']
    },
    product_quantity:{
        type: Number,
        required: [true, 'Por favor ingresa la cantidad del producto'], 
    },
    product_price:{
        type: Number,
        required: [true, 'Por favor ingresa el precio del producto'], 
    },
    sales_price:{
        type: Number,
        required: [true, 'Ingresa el valor total de la venta'],
    },
    active:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Sale', saleSchema)