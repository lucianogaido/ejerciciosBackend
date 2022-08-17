const express = require("express");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Contenedor = require("./public/contenedor");
const contenedor = new Contenedor("./public/productos.txt");

const Messenger = require("./public/contenedor");
const messenger = new Messenger("./public/chat.txt");

const app = express();

const serverHttp = new HttpServer(app)
const io = new IOServer(serverHttp)

const PORT = 4000 || process.env.PORT;
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

app.get('/', (req, res) => {

    res.render('pages/index', {
        productos: arrayProd,
        nav: "formulario"
    })
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
        nav: "productos"
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


serverHttp.listen(4000, (err) => {
    if (err) throw new Error('error')
    console.log('server en el ' + PORT)
})