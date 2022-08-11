const express  = require("express");
const handlebars = require('express-handlebars')

const Contenedor = require("../public/contenedor");
const contenedor = new Contenedor("../public/productos.txt");

const app= express();
const PORT = 4000 || process.env.port;
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'hbs');
app.set('views', './views');


app.engine(
    'hbs', 
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/partials'
    })
)


let arrayProd = []

app.get('/', (req, res)=>{
    
    res.render('partials/form',{
        productos: arrayProd,
        nav: true
    })
})

app.post('/productos', async (req, res) =>{
    const producto = await contenedor.save(req.body);
    res.render('partials/form',{
        productos: producto,
        nav: true
        
    
    })
})
app.get('/productos', async (req, res) =>{
    arrayProd = await contenedor.getAll();
    const listaProd = arrayProd.length > 0
    res.render('pages/productos',{
        productos: arrayProd,
        nav: false,
        listaProd

    
    })
})


const server = app.listen(4000, (err)=>{
    if(err)throw new Error('error')
    console.log('server en el '+ PORT)
})