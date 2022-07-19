const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt')

contenedor.save({nombre: 'Mermelada de Arandanos', precio: 500, categoria: 'Mermeladas', descripcion: '100% Naturales'})

// contenedor.getById(2)

// contenedor.getAll()

// contenedor.deleteById(4)

// contenedor.deleteAll()

