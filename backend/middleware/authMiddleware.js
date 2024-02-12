const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customersModel')

const protect  = asyncHandler(async(req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.customer = await Customer.findById(decoded.id_cusomer).select('-password')

      next()
    } catch(error){
      console.log(error)
      res.status(401)
      throw new Error('Acceso no permitido')
    }
  } 
  if(!token){
    res.status(401)
    throw new Error('Acceso no autorizado, no hay un token disponible')
  }
})

module.exports = { protect }