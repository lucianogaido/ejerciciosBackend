const express  = require("express");

const Contenedor = require("../public/contenedor");
const contenedor = new Contenedor("../public/productos.txt");

const app= express();
const PORT = 4000 || process.env.port;
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'pug');
app.set('views', './views');

let arrayProd = []
app.get('/', (req, res)=>{
    
    res.render('pages/index',{
        productos: arrayProd,
        nav:"formulario"
    })
})

app.post('/productos', async (req, res) =>{
    const producto = await contenedor.save(req.body);
    res.render('pages/index',{
        productos: producto,
        nav:"formulario"
        
    
    })
})
app.get('/productos', async (req, res) =>{
    arrayProd = await contenedor.getAll();
    res.render('pages/productos',{
        productos: arrayProd,
        nav:"productos"

    
    })
})


const server = app.listen(4000, (err)=>{
    if(err)throw new Error('error')
    console.log('server en el '+ PORT)
})