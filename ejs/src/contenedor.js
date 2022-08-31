const fs = require('fs');

class Contenedor{
    constructor(ruta){
        this.ruta= ruta
    }
    async save(obj){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if(dataArchParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {...obj, id: dataArchParse[dataArchParse.length - 1 ].id + 1}], null, 2))
                console.log( `El Archivo tiene el ID: ${dataArchParse[dataArchParse.length - 1 ].id + 1}`)

            }else{
            await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2))
            console.log( `El Archivo tiene el ID: ${dataArchParse.length + 1}`)
            }
            return dataArchParse.length + 1
        } catch(error){
            console.log(error)
        }
    }
    async updateById(obj){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            const objIndex = dataArchParse.findIndex(prod => prod.id === obj.id)
            if(objIndex !== -1){
                dataArchParse[objIndex] = obj
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))
                return { msg: 'Producto actualizado'}
            }else{
                return {error: 'no existe el producto'}
            }
        } catch(error){
            console.log(error)
        }
    }
    // Traer producto por ID
    async getById(id){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id )
            if (producto){
                console.log(producto)
                return producto
            }else{
                console.log('No se encontró el producto')
                return null
            }
        } catch(error){
            console.log(error)
        }
    }
    // Traere todo

    async getAll (){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if(dataArchParse.length){
                return dataArchParse
            }else{
                console.log('No hay productos')
            }
        }catch(error){
            console.log(error)
        }
    }
    // Eliminar por ID
    async deleteById(id){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id )
            if(producto){
                const dataArchParseFiltrado= dataArchParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                console.log('Producto Eliminado')
            }else{
                console.log('No existe el producto')
            }
        }catch(error){
            console.log(error)
        }
    }
    // Delete All
    async deleteAll(){
        let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchParse = JSON.parse(dataArch)
        if(dataArchParse.length){
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
        }else{
            console.log('No hay productos')
        }
}
}

class Messenger{
    constructor(ruta){
        this.ruta= ruta
    }
    async save(obj){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if(dataArchParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {...obj, id: dataArchParse[dataArchParse.length - 1 ].id + 1}], null, 2))
                console.log( `El Archivo tiene el ID: ${dataArchParse[dataArchParse.length - 1 ].id + 1}`)

            }else{
            await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2))
            console.log( `El Archivo tiene el ID: ${dataArchParse.length + 1}`)
            }
            return dataArchParse.length + 1
        } catch(error){
            console.log(error)
        }
    }

    async getAll (){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if(dataArchParse.length){
                return dataArchParse
            }else{
                console.log('No hay productos')
            }
        }catch(error){
            console.log(error)
        }
    }


}


module.exports= Contenedor;
module.exports= Messenger;