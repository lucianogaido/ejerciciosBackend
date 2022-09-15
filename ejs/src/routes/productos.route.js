const express = require('express')

const{ getProducts, getProductById, postProduct, putProduct, deleteProduct } = require('../controllers/productos.controllers.js')
const { Router } = express

const routerProductos= Router()

routerProductos.get('/productos', getProducts)
routerProductos.get('/productos/:id', getProductById)
routerProductos.post('/productos', postProduct)
routerProductos.put('/:id', putProduct)
routerProductos.delete('/:id', deleteProduct)

module.exports = routerProductos