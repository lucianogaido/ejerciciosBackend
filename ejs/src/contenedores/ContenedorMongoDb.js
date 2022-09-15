const mongoose = require('mongoose')
const config = require('../../config.js')

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorMongoDb{
    
    constructor( nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    // LEER TODOS LOS DOCUMENTOS 
    async readOne(id) {
        try {
            const doc = await this.coleccion.find()
            console.log(doc)
            return doc

        } catch (error) {
            console.log(error)
        }
    }

    // CREATE
    async save(obj) {
        try {
            
            const doc = await this.coleccion.create(obj)
            await doc.save()
            console.log('usuario creado')
            return doc
        } catch (error) {
            console.log(error)
        }

    }
    // UPDATE 
    async update(id, obj) {
        try {
            const item = await this.coleccion.updateOne({'_id': id}, {$set: obj})
            console.log(`${item} actualizado`)
            return item

        } catch (error) {
            console.log(error)
        }


    }
    // DELETE 
    async detele(id) {
        try {
            const item = await this.coleccion.deleteOne({'_id': id})
            console.log(`${item} eliminado`)

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports= ContenedorMongoDb