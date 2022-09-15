const {response} = require('express')

// const Contenedor= require('../contenedores/contenedor.js')

// const carrito = new Contenedor('./carrito.txt')

const { carritosDao: carritosApi } = require('../daos/index.js')

const getCart = async (req, res= response) => {
    arrayCarrito = await carritosApi.getAll();
    res.render('pages/carrito', {
        productos: arrayCarrito, 
        nav: "productos"
    })
}

const getProdCart = async(req, res = response) => {
    const id = req.params.id
    const productoId = await carritosApi.getById(Number(id))
    if (productoId){
    res.render('pages/carrito',{
        productos: productoId,
        nav: "productos"
        
    })}else{
        res.render({
            productos: 'Producto no encontrado'
        })
    }
}

const postCart = async (req, res = response) => {
    const producto = await carritosApi.save({nombre: 'Mermelada', descripcion: 'Mandarina', precio: 500});
    console.log("req:", producto)
    res.render('pages/carrito', {
        productos: producto,
        nav: "productos"
    })
}


const putCart = async (req, res = response) =>{
    const objetoProducto = req.body
    const {id} = req.params
    carritosApi.updateById({id: Number(id), ...objetoProducto})
}

const deleteCart = (req, res = response) => {
    const {id} = req.params
    carritosApi.deleteById(Number(id))
    res.json({
        msg:'producto borrado'
    })
}

module.exports = {
    getCart,
    getProdCart,
    postCart,
    putCart,
    deleteCart
}
