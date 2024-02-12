const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
  first_name:{
    type: String,
    required: [true, 'Por favor ingrese el nombre']
  },
  last_name:{
    type: String,
    required: [true, 'Por favor ingresa el apellido']
  },
  address:{
    type: String,
    required: [true, 'Ingresa la dirección del comprador']
  },
  email:{
    type: String,
    required: [true, 'Ingresa el email del comprador']
  },
  password:{
    type: String,
    required: [true, 'Ingresa la contraseña']
  },
  phone:{
    type: Number,
    required: [true, 'Ingresa el numero de telefono']
  },
  zip_code:{
    type: String,
    required: [true, 'Ingresa  el codigo postal'], 
  },
  city:{
    type: String,
    required: [true, 'ingresa la ciudad del comprador']
  },
  neighborhood:{
    type: String,
    required: [true, 'Ingresa la colonia del comprador']
  },
  active:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Customer', customerSchema)