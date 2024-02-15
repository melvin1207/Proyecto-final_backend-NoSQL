const asyncHandler = require('express-async-handler')
const Sale = require('../models/salesModel')

const saleProtect  = asyncHandler(async(req, res, next) => {
  const sale = await Sale.findById(req.params.id)

  if (!sale) {
    res.status(400)
    throw new Error('Esa venta no existe')
  }

  try{
    if(req.customer.id !== sale.customer.toString()){
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

module.exports = { saleProtect }