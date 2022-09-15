const admin = require("firebase-admin");
const config = require('../../config.js')

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});



const db = admin.firestore()

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    // LEER UNO SOLO
    async readOne(id) {
        try {
            const doc = await this.coleccion.doc(id)
            let queryReadONE = await doc.get()
            const respuesta = { id: queryReadONE.id, ...queryReadONE.data() }
            console.log(respuesta)

        } catch (error) {
            console.log(error)
        }
    }

    // LEER TODOS LOS DOCUMENTOS 
    async readAll() {
        try {
            const queryRead = await this.coleccion.doc.get()
            const respuesta = queryRead.docs.map(documento => ({ id: documento.id, ...documento.data() }))
            console.log(respuesta)

        } catch (error) {
            console.log(error)
        }
    }
    // CREATE
    async save(obj) {
        try {
            let id = 2
            const doc = await this.coleccion.doc(id)
            await doc.create(obj)
            console.log('usuario creado')
        } catch (error) {
            console.log(error)
        }

    }
    // UPDATE 
    async update(id, obj) {
        try {
            const doc = await this.coleccion.doc(id)
            const item = doc.update(obj)
            console.log(`${item} actualizado`)

        } catch (error) {
            console.log(error)
        }


    }
    // DELETE 
    async detele(id) {
        try {
            const doc = await this.coleccion.doc(id)
            const item = await doc.delete()
            console.log(`${item} eliminado`)

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports= ContenedorFirebase