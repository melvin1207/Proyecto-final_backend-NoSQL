const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Client = require('../models/clientsModel')

const protect  = asyncHandler(async(req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.client = await Client.findById(decoded.id_client).select('-password')

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