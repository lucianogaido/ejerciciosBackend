class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre 
        this.apellido = apellido
        this.libros = libros
        this.mascotas= mascotas
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(newMascota){
        this.mascotas.push(newMascota)
    }

    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros.push(
            {
                nombre: nombre,
                autor: autor
            }
        )
    }
    getBookNames(){
        return this.libros.map(libro => libro.nombre)
    }
}
 
const usuario = new Usuario("Luciano", "Gaido",
     [{
        nombre: "Harry Potter y las Reliquias de la Muerte",
        autor: "J.K.Rowling"
     }],
     ["Lala"," Oddie", " Afra", " Hanna"]
     );

// Logueo el nombre completo
console.log("Nombre Completo: ", usuario.getFullName());

// Logueo los nombres de las Mascotas
console.log("Mascotas: ", usuario.mascotas);

// Logueo la cantidad de Mascotas
console.log('Cantidad de mascotas: ', usuario.countMascotas());

// Ejecuto la funcion addMascota
usuario.addMascota(" Cumbia");

// Logueo los nombres de las Mascotas
console.log("Mascotas: ", usuario.mascotas);

// Logueo la cantidad de Mascotas
console.log('Cantidad de mascotas: ', usuario.countMascotas());

// Logueo los nombres de los Libros
console.log("Nombres de Libros", usuario.getBookNames());

// Ejecuto la funcion addBook
usuario.addBook("Las cosas que perdimos en el fuego", "Mariana Enriquez");

// Logueo los nombres de los Libros
console.log("Nombres de Libros", usuario.getBookNames());
