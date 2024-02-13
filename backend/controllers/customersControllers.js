const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynHandler = require('express-async-handler')
const Customer = require('../models/customersModel')

const createCustomer = asynHandler(async(req, res) => {
  //Se desestructura el body
  const { first_name, last_name, address, email, password, phone, zip_code, city, neighborhood } = req.body

  //verificacion de todos los datos necesarios
  if(!first_name || !last_name || !address || !email || !password || !phone || !zip_code || !city || !neighborhood || !isAdmin){
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
    neighborhood.
    isAdmin
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
})

const loginCustomer = asynHandler(async(req, res) => {
  const { email, password } = req.body

  //verificar que exista un usuario con un email igual
  const customer = await Customer.findOne({ email })

  //si el usuario existe verificamos tambien el password
  if (customer && (await bcrypt.compare(password, customer.password))) {
      res.status(200).json({
          _id: customer.id,
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          token: generarToken(customer.id)
      })
  } else {
      res.status(400)
      throw new Error('Acceso no autorizado')
  }
})

const datosCustomer = asynHandler(async(req, res) => {
  res.status(200).json(req.customer)
})

const updateCustomer = asynHandler(async(req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) {
    res.status(400)
    throw new Error('Ese customer no existe')
  }

  const customerUpdated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(customerUpdated)
})

const softDeleteCustomer = asynHandler(async(req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) {
    res.status(400)
    throw new Error('Ese customer no existe')
  }

  const customerUpdated = await Customer.findByIdAndUpdate(req.params.id, { active: false } , { new: true })
  res.status(200).json(customer)
})

const destroyCustomer = asynHandler(async(req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) {
      res.status(400)
      throw new Error('Esa tarea no existe')
  }

  await Customer.deleteOne(customer)
  res.status(200).json({ id: req.params.id })
})

//funcion para generar el token
const generarToken = (id_customer) => {
  return jwt.sign({ id_customer }, process.env.JWT_SECRET, {
      expiresIn: '30d'
  })
}

module.exports = {
  createCustomer,
  loginCustomer,
  datosCustomer, 
  updateCustomer,
  softDeleteCustomer,
  destroyCustomer
}