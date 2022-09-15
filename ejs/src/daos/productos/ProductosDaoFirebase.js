const ContenedorFirebase = require('../../contenedores/contenedor.js')

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos')
    }
}

module.exports= ProductosDaoFirebase