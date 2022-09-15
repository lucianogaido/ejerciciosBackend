const Contenedor = require('../../contenedores/contenedor.js')

class ProductosDaoArchivo extends Contenedor {
    constructor(){
        super('productos.txt')
    }
}

module.exports= ProductosDaoArchivo