const express = require("express");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

// const Contenedor = require("./src/contenedor");
// const contenedor = new Contenedor("./txt/productos.txt");

// const Messenger = require("./src/contenedor");
// const messenger = new Messenger("./txt/chat.txt");

        // SQL 
import options from './mariaDB/conexionDB.js'
import { options as SQLiteOptions} from './sqlite/conexionDB.js' 
const Contenedor = require("./src/contenedorSQL");

const Messenger = require("./src/contenedorSQL");

const contenedor = new Contenedor(options, "productos");
const messenger = new Messenger(SQLiteOptions,"mensajes");

const carrito = new Contenedor("./txt/carrito.txt");

const serverHttp = new HttpServer(app)
const io = new IOServer(serverHttp)

const PORT = 8080 || process.env.PORT;

const routerCarrito = require('./src/routes/carrito.route.js')
const routerProductos = require('./src/routes/productos.route.js')

const app = express()


app.set('view engine', 'ejs');
app.set('views', './views');

const agregarAlCarrito = async(obj) =>{
    await carrito.save(obj)
}

//........................PRODUCTOS CONTROLLERS............//
app.get('/', (req, res) => {

    res.render('pages/index', {
        productos: arrayProd,
        nav: "formulario"
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
//**************************************    server modularizado  **********************************************************


app.use(express.static('public'))
app.use(expres.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

serverHttp.listen(PORT, (err) => {
    if (err) throw new Error('error')
    console.log(`server en el  ${PORT}`)
})
