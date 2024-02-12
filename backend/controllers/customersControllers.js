const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynHandler = require('express-async-handler')
const Customer = require('../models/customersModel')

const createCustomer = asynHandler(async(req, res) =>{
  //Se desestructura el body
  const { first_name, last_name, address, email, password, phone, zip_code, city, neighborhood } = req.body

  //verificacion de todos los datos necesarios
  if(!first_name || !last_name || !address || !email || !password || !phone || !zip_code || !city || !neighborhood){
    res.status(400)
    throw new Error('Faltan datos')
  }

  //verificar que el usuario no exista con el email
  const customerExist = await Customer.findOne({ email })
  if(customerExist){
    res.status(400)
    throw new Error('El correo ya existe')
  }

  //se hace el HASH del password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Para crear al usuario
  const customer = await Customer.create({
    first_name,
    last_name,
    address,
    email,
    password: hashedPassword,
    phone,
    zip_code,
    city, 
    neighborhood
  })

  if(customer){
    res.status(201).json({
      _id:  customer._id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      city: customer.city,
      email: customer.email
    })
  } else{
    res.status(400)
    throw new Error('No se pudieron guardar los datos')
  }
  //res.status(201).json({ message: 'Crear Usuario '})
})

module.exports = {
  createCustomer
}