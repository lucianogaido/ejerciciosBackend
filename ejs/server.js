const express = require("express");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Contenedor = require("./public/contenedor");
const contenedor = new Contenedor("./public/productos.txt");

const Messenger = require("./public/contenedor");
const messenger = new Messenger("./public/chat.txt");

const carrito = new Contenedor("./public/carrito.txt");

const app = express();

const serverHttp = new HttpServer(app)
const io = new IOServer(serverHttp)

const PORT = 8080 || process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

// app.get('/', (req, res)=>{
//     res.sendFile('/index.html', {root: __dirname})
// })




app.set('view engine', 'ejs');
app.set('views', './views');

let arrayProd = []

let productos = []

let mensajes = []

let arrayCarrito = []

// const agregarAlCarrito = async(id) =>{
//     const arrayProductos = await contenedor.getAll();
//     const productoAgregado = arrayProductos.find(producto => producto.id === id);
//     console.log("productoAgregado", productoAgregado)
//     await carrito.save(productoAgregado);
// }
const agregarAlCarrito = async(obj) =>{
    await carrito.save(obj)
}
app.get('/', (req, res) => {

    res.render('pages/index', {
        productos: arrayProd,
        nav: "formulario"
    })
})

app.get('/productos/:id', async(req, res) => {
    const id = req.params.id
    const productoId = await contenedor.getById(Number(id))
    if (productoId){
    res.render('pages/index',{
        productos: productoId,
        nav: "formulario"
        
    })}else{
        res.json({
            error: 'Producto no encontrado'
        })
    }
})

app.post('/productos', async (req, res) => {
    const producto = await contenedor.save(req.body);
    res.render('pages/index', {
        productos: producto,
        nav: "formulario"
    })
})
app.get('/productos', async (req, res) => {
    arrayProd = await contenedor.getAll();
    res.render('pages/productos', {
        productos: arrayProd,
        nav: "productos",
        agregarAlCarrito
        // carrito
    })
})

app.put('/:id', (req, res) =>{
    const objetoProducto = req.body
    const {id} = req.params
     contenedor.updateById({id: Number(id), ...objetoProducto})
})

app.delete('/:id', (req, res) => {
    const {id} = req.params
    contenedor.deleteById(Number(id))
    res.json({
        msg:'producto borrado'
    })
})

io.on('connection', async (socket) => {
    console.log('a user connected')
    mensajes = await messenger.getAll();
    productos = await contenedor.getAll();
    const mensaje = {
        mensaje: "ok",
        productos
    }
    socket.emit('mensaje-server', mensaje)
    socket.on('producto-nuevo', (producto, cb) => {
        productos.push(producto)
        producto = contenedor.save(producto);

        const mensaje = {
            mensaje: "productos insertados",
            productos
        }
        const id = new Date().getTime()
        io.sockets.emit('mensaje-server', mensaje)
        cb(id)
    })
    socket.on('mensaje-nuevo', (mensaje)=>{
        mensajes.push(mensaje)
        mensaje = messenger.save(mensaje);

        const chat ={
            mensajes
        }
        io.sockets.emit('chat-server', chat)
    })
})

//**************************************    CARRITO  **********************************************************
//   carrito.save({nombre: 'Mermelada', precio: 500, descripcion: 'Mandarina'})



app.get('/carrito', async (req, res) => {
    arrayCarrito = await carrito.getAll();
    res.render('pages/carrito', {
        productos: arrayCarrito, 
        nav: "productos"
    })
})

app.get('/carrito/:id', async(req, res) => {
    const id = req.params.id
    const productoId = await carrito.getById(Number(id))
    if (productoId){
    res.render('pages/carrito',{
        productos: productoId,
        nav: "productos"
        
    })}else{
        res.render({
            productos: 'Producto no encontrado'
        })
    }
})

app.post('/carrito', async (req, res) => {
    const producto = await carrito.save({nombre: 'Mermelada', descripcion: 'Mandarina', precio: 500});
    console.log("req:", producto)
    res.render('pages/carrito', {
        productos: producto,
        nav: "productos"
    })
})


app.put('/carrito/:id', (req, res) =>{
    const objetoProducto = req.body
    const {id} = req.params
     contenedor.updateById({id: Number(id), ...objetoProducto})
})

app.delete('/carrito/:id', (req, res) => {
    const {id} = req.params
    contenedor.deleteById(Number(id))
    res.json({
        msg:'producto borrado'
    })
})


serverHttp.listen(PORT, (err) => {
    if (err) throw new Error('error')
    console.log(`server en el  ${PORT}`)
})