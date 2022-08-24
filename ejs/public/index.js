console.log("hola mundo")



const render = (productos) =>{
    let listado = document.querySelector('#listado')
    console.log(listado)
    let html = productos.map(prod =>{
        return `<div class="row" style="margin-left: 200px ;" >
        <div class="cart-item col" xs={12} md={3}>
            <p><strong>${prod.nombre}</strong></p>
        </div>
        <div class="cart-item col" xs={12} md={2}>
            <p><strong> ${prod.descripcion} </strong></p>
        </div>
        <div class="cart-item col" xs={12} md={2}>
            <p><strong>$ ${prod.precio} </strong></p>
        </div>
    </div>`
    })
    listado.innerHTML = html.join(' ')
}

// const agregarAlCarrito = async (obj) =>{
//             let dataArch = await fs.promises.readFile("/carrito.txt", 'utf8')
//             let dataArchParse = JSON.parse(dataArch)
//             if(dataArchParse.length){
//                 await fs.promises.writeFile("/carrito.txt", JSON.stringify([...dataArchParse, {...obj, id: dataArchParse[dataArchParse.length - 1 ].id + 1}], null, 2))
//                 console.log( `El Archivo tiene el ID: ${dataArchParse[dataArchParse.length - 1 ].id + 1}`)


//             }else{
//             await fs.promises.writeFile("/carrito.txt", JSON.stringify([{...obj, id: 1}], null, 2))
//             console.log( `El Archivo tiene el ID: ${dataArchParse.length + 1}`)
//             }
            
//         }


const chatFunction = (mensajes) =>{
    let conversacion = document.querySelector('#conversacion')
    let chatHtml = mensajes.map( msj =>{
        return ` <li style="color:brown;">
        <strong style="color: blue;">${msj.email}</strong>
        [${msj.fechaActual}] : 
        <em style="color:green;">${msj.message}</em>
        </li>`
    })
    conversacion.innerHTML = chatHtml.join(' ')
}



const addProduct = (evt) =>{
    const nombre = document.querySelector('#nombre').value
    const descripcion = document.querySelector('#descripcion').value
    const precio = document.querySelector('#precio').value
    const producto = {nombre, descripcion, precio}
    server.emit('producto-nuevo', producto, (id)=>{
        console.log(id)
    })
    return false
}

const send = (evt) =>{
    const email = document.querySelector('#email').value
    const message = document.querySelector('#message').value
    const fecha = new Date();
    const fechaActual = fecha.toLocaleString();
    const mensaje = {email, message, fechaActual}
    if (email !== ''){
    server.emit ('mensaje-nuevo', mensaje)
    return false
}
}


const server = io().connect()
server.on('mensaje-server', mensaje =>{
    render(mensaje.productos)
})


server.on('chat-server', chat =>{
    chatFunction(chat.mensajes)
})
