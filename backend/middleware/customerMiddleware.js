const asyncHandler = require('express-async-handler')

const customerProtect  = asyncHandler(async(req, res, next) => {
  try{
    if(req.customer.id !== req.params.id){
      res.status(401)
      throw new Error('Acceso no permitido')
    } else {
      next()
    }
  } catch(error){
    console.log(error)
    res.status(401)
    throw new Error('Acceso no permitido')
  }
})

module.exports = { customerProtect }