const ContenedorFirebase = require('../../contenedores/contenedor.js')

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos')
    }
}

module.exports= CarritosDaoFirebase