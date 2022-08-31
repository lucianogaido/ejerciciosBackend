import knex from 'knex'

class Contenedor {
    constructor(options, nombreTabla) {
        this.options = options;
        this.nombreTabla = nombreTabla;
    }
    async save(data) {
        const database = knex(options)
        try {
            await database(this.nombreTabla).insert(data)
            console.log('Guardado existosamente')
        } catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }
    async updateById(id, data) {
        const database = knex(options)
        try {
            await database.from(this.nombreTabla).where('id', id).update(data)
        } catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }
    // Traere todo

    async getAll() {
        const database = knex(options)
        try {
            const rows = await database.from(this.nombreTabla).select('*')
            return rows;
        }
        catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }
    // Eliminar por ID
    async deleteById(id) {
        const database = knex(options)
        try {
            await database.from(this.nombreTabla).where('id', '=', id).del()
            console.log(`objeto id:${id} eliminado`)
        } catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }
    // Delete All
    async deleteAll() {
        const database = knex(options)
        try {
            await database.from(this.nombreTabla).del()
            console.log('tabla vaciada')
        } catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }
}


class Messenger {
    constructor(options, nombreTabla) {
        this.options = options;
        this.nombreTabla = nombreTabla;
    }
    async save(data) {
        const database = knex(options)
        try {
            await database(this.nombreTabla).insert(data)
            console.log('Guardado existosamente')
        } catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }

    async getAll() {
        const database = knex(options)
        try {
            const rows = await database.from(this.nombreTabla).select('*')
            return rows;
        }
        catch (err) { console.log(err) }
        finally {
            database.destroy()
        }
    }


}


module.exports = Contenedor;
module.exports = Messenger;