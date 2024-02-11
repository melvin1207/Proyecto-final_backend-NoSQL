const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    description:{
        type: String,
        required: [true, 'Por favor ingresa una descripción']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)