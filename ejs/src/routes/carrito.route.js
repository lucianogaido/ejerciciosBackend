const express = require('express')

const { getCart, getProdCart, postCart, putCart, deleteCart } = require('../controllers/carrito.controller')
const { Router } = express

const routerCarrito= Router()

routerCarrito.get('/carrito', getCart)
routerCarrito.get('/carrito/:id', getProdCart)
routerCarrito.post('/carrito', postCart)
routerCarrito.put('/carrito/:id', putCart)
routerCarrito.delete('/carrito/:id', deleteCart)

module.exports = routerCarrito