const asyncHandler = require('express-async-handler')

const isAdminProtect  = asyncHandler(async(req, res, next) => {
  try{
    if(req.customer.isAdmin !== true){
      res.status(401)
      throw new Error('Acceso no permitido')
    } else {
      next()
    }
  } catch(error){
    console.log(error)
    res.status(401)
    throw new Error('Acceso no permitido no es administrador')
  }
})

module.exports = { isAdminProtect }