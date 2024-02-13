const asynHandler = require('express-async-handler')
const Sale = require('../models/salesModel')

const createSale = asynHandler(async(req, res) => {
  if(!req.body.order_number){
    res.status(400)
    throw new Error("Falta el numero de venta")
  }

  const sale = await Sale.create({
    customer: req.customer.id,
    order_number: req.body.order_number,
    product_quantity: req.body.product_quantity, 
    product_price:req.body.product_price,
    sales_price: parseFloat(req.body.product_quantity) * parseFloat(req.body.product_price)
  })

  res.status(201).json(sale)
})

const getSales = asynHandler(async(req, res) => {
  const sales = await Sale.find({ customer: req.customer.id })
  res.status(200).json(sales)
})

const updateSale = asynHandler(async(req, res) => {
  const sale = await Sale.findById(req.params.id)

  if (!sale) {
    res.status(400)
    throw new Error('Esa venta no existe')
  }

  const saleUp = {
    order_number: sale.order_number,
    product_quantity: req.body.product_quantity,
    product_price: req.body.product_price,
    sales_price: parseFloat(req.body.product_quantity) * parseFloat(req.body.product_price)
  } 

  const saleUpdated = await Sale.findByIdAndUpdate(req.params.id, saleUp, { new: true })
  res.status(200).json(saleUpdated)
})

const softDeleteSale = asynHandler(async(req, res) => {
  const sale = await Sale.findById(req.params.id)

  if (!sale) {
    res.status(400)
    throw new Error('Ese sale no existe')
  }

  const saleUpdated = await Sale.findByIdAndUpdate(req.params.id, { active: false } , { new: true })
  res.status(200).json(sale)
})

const destroySale = asynHandler(async(req, res) => {
  const sale = await Sale.findById(req.params.id)

  if (!sale) {
      res.status(400)
      throw new Error('Esa venta no existe')
  }

  await sale.deleteOne(sale)
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  createSale,
  getSales, 
  updateSale,
  softDeleteSale,
  destroySale
}