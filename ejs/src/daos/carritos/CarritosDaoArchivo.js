const Contenedor = require('../../contenedores/contenedor.js')

class CarritosDaoArchivo extends Contenedor {
    constructor(){
        super('carrito.txt')
    }
}

module.exports= CarritosDaoArchivo