const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt')

//   contenedor.save({nombre: 'Mermelada de Mandarina', precio: 500, categoria: 'Mermeladas', descripcion: '100% Naturales'})

// contenedor.getById(2)

// contenedor.getAll()

// contenedor.deleteById(4)

// contenedor.deleteAll()


// Servidor con Express / ROUTER
const express = require('express')
const app = express()
const PORT = 8080

const { Router } = express
const routerProductos = Router()
const routerProductosRandom = Router()

const server = app.listen(PORT, () => {
    console.log(`Escuchando el servidor ${PORT}`)
})

// routerProductos.get('/', async(req,res)=> {
//     const arrayProductos= await contenedor.getAll()
//     res.send(arrayProductos)
// })

// app.use('/productos', routerProductos)

// routerProductosRandom.get('/', async(req,res)=> {
//     const productosTotales= await contenedor.getAll()
//     const random = Math.floor(Math.random()* productosTotales.length) 
//     res.send(productosTotales[random])
// })
// app.use('/productoRandom',routerProductosRandom)

//***************************  API RESTful************************************* */

const productos = Router()
const idProductos = Router()
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

productos.get('/', async(req, res)=>{
    const productosTotales = await contenedor.getAll()
    res.json({
        productosTotales
    })
})

app.use('/api/productos', productos)

idProductos.get('/:id', async(req, res) => {
    const id = req.params.id
    const productoId = await contenedor.getById(Number(id))
    if (productoId){
    res.json({
        productoId
        
    })}else{
        res.json({
            error: 'Producto no encontrado'
        })
    }
})
app.use('/api/productos/id', idProductos)

productos.post('/', async(req, res) =>{
    const producto = req.body.producto
    const sabor = req.body.sabor
    contenedor.save({nombre: `${producto} de ${sabor}`, precio: 500, categoria: 'Mermeladas', descripcion: '100% Naturales'});
    const productosTotales = await contenedor.getAll()
    const productosTotalesDenuevo = await contenedor.getAll()
    const elemento = productosTotalesDenuevo[productosTotalesDenuevo.length-1]
    res.json({
        elemento
    })
})


idProductos.put('/:id', (req, res) =>{
    const objetoProducto = req.body
    const {id} = req.params
     contenedor.updateById({id: Number(id), ...objetoProducto})
})

idProductos.delete('/:id', (req, res) => {
    const {id} = req.params
    contenedor.deleteById(Number(id))
    res.json({
        msg:'producto borrado'
    })
})
