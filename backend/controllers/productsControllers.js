const asynHandler = require('express-async-handler')
const Product = require('../models/productsModel')
const Customer = require('../models/customersModel')

const createProduct = asynHandler(async(req, res) => {
  const customer = await Customer.findById(req.params.id)

  if(customer.isAdmin == true){
    //Se desestructura el body
    const { name, description, cost, sku, category } = req.body

    //verificacion de todos los datos necesarios
    if(!name || !description || !cost || !sku || !category){
      res.status(400)
      throw new Error('Faltan datos')
    }

    //verificar que el usuario no exista con el email
    const productExist = await Product.findOne({ sku })
    if(productExist){
      res.status(400)
      throw new Error('El prodcuto ya existe')
    }

    const product = await Product.create({
      name, 
      description,
      cost,
      sku,
      category
    })

    if(product){
      res.status(201).json({
        _id:  product._id,
        name: product.name,
        description: product.description,
        cost: product.cost,
        sku: product.sku,
        category: product.category
      })
    } else{
      res.status(400)
      throw new Error('No se pudieron guardar los datos')
    }
  } else{
    res.status(400)
    throw new Error("No es administrador")
  }
})

const getProduct = asynHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json(product)
})

const updateProduct = asynHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('Ese producto no existe')
  }

  const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(productUpdated)
})

const softDeleteProduct = asynHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('Ese producto no existe')
  }

  const productUpdated = await Product.findByIdAndUpdate(req.params.id, { active: false } , { new: true })
  res.status(200).json(product)
})

const destroyProduct = asynHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
      res.status(400)
      throw new Error('Ese producto no existe')
  }

  await Product.deleteOne(product)
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  createProduct,
  getProduct, 
  updateProduct,
  softDeleteProduct,
  destroyProduct
}