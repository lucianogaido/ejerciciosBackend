const {response}= require ('express')

// const Contenedor= require('../contenedores/contenedor.js')

// const contenedor = new Contenedor('./productos.txt')

// const ProductosDaoArchivo = require('../daos/productos/ProductosDaoArchivo')
// const productosDaoArchivo = new ProductosDaoArchivo()
const { productosDao: productosApi } = require('../daos/index.js')

app.get('/', (req, res) => {

    res.render('pages/index', {
        productos: arrayProd,
        nav: "formulario"
    })
})

const getProductById = async(req, res = response) => {
    const id = req.params.id
    const productoId = await productosApi.getById(Number(id))
    if (productoId){
    res.render('pages/index',{
        productos: productoId,
        nav: "formulario"
        
    })}else{
        res.json({
            error: 'Producto no encontrado'
        })
    }
}

const postProduct = async (req, res = response) => {
    const producto = await productosApi.save(req.body);
    res.render('pages/index', {
        productos: producto,
        nav: "formulario"
    })
}

const getProducts = async (req, res = response) => {
    arrayProd = await productosApi.getAll();
    res.render('pages/productos', {
        productos: arrayProd,
        nav: "productos",
        agregarAlCarrito
        // carrito
    })
}

const putProduct = async (req, res) =>{
    const objetoProducto = req.body
    const {id} = req.params
    const producto = await productosApi.updateById({id: Number(id), ...objetoProducto})
    res.json({
        msg: 'producto actualizado',
        producto
    })
}

const deleteProduct= async (req, res) => {
    const {id} = req.params
    await productosApi.deleteById(Number(id))
    res.json({
        msg:'producto borrado'
    })
}

module.exports = {
    getProducts ,
    getProductById ,
    postProduct ,
    putProduct ,
    deleteProduct

}