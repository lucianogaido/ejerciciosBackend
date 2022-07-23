const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt')

//   contenedor.save({nombre: 'Mermelada de Mandarina', precio: 500, categoria: 'Mermeladas', descripcion: '100% Naturales'})

// contenedor.getById(2)

// contenedor.getAll()

// contenedor.deleteById(4)

// contenedor.deleteAll()


// Servidor con Express
const express = require('express')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando el servidor ${PORT}`)
})

app.get('/productos', async(req,res)=> {
    const arrayProductos= await contenedor.getAll()
    res.send(arrayProductos)
})

app.get('/productoRandom', async(req,res)=> {
    const productosTotales= await contenedor.getAll()
    const random = Math.floor(Math.random()* productosTotales.length) 
    res.send(productosTotales[random])
})