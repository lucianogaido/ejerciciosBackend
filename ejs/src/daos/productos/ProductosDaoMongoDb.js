const ContenedorMongoDb = require('../../contenedores/contenedor.js')

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super('productos',{
            name: {type: String, required: true},
            descripcion: {type: String, required: true},
            price: {type: Number, required: true},
            thumbnail: {type: String, required: true}
        })
    }
}

module.exports= ProductosDaoMongoDb