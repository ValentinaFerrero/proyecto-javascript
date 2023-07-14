const tienda = document.getElementById("tienda");
const verCarrito = document.getElementById ("mostrarCarrito")
const modalContainer = document.getElementById ("modal-container")
const cantidadProductos = document.getElementById("cantidadProductos")

const productos = [ 
    {
        id: 1,
        nombre: "Cereales",
        precio: 200,
        descripcion: "Cereales como almohaditas, arroz inflado, copitos de maiz, bolitas de chocoltaes, etc",
        cantidad: 1,
        img: "https://plus.unsplash.com/premium_photo-1675237626442-cb1af9f49a92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
        id: 2,
        nombre: "Frutos secos",
        precio: 650,
        descripcion: "almendra, avellana, cacahuete, castaña, dátil, nuez, pasas, etc",
        cantidad: 1,
        img: "https://images.unsplash.com/photo-1600189020840-e9918c25269d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
        id: 3,
        nombre: "Especias",
        precio: 380,
        descripcion: "Anís, Canela, Cardamomo, Cilantro, Comino, Cúrcuma, Nuez moscada, etc",
        cantidad: 1,
        img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    },
    {
        id: 4,
        nombre: "Suplementos",
        precio: 1000,
        descripcion: "Los suplementos dietéticos son productos que contienen un «ingrediente alimenticio» destinado a complementar la alimentación.",
        cantidad: 1,
        img: "https://images.unsplash.com/photo-1670850756988-a1943aa0e554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=484&q=80",
    },
    {
        id: 5,
        nombre: "Productos para celiacos",
        precio: 740,
        descripcion: "Maíz (harina de maíz, sémola de maíz y polenta etiquetada como libre de gluten, Lino, Harinas sin gluten, Maíz precocido (maíz), etc",
        cantidad: 1,
        img: "https://images.unsplash.com/photo-1586137712370-9b450509c587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((producto) => {
    let contenido= document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
    <img src="${producto.img}">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p class="precio">${producto.precio} $</p>
    `;
    tienda.appendChild(contenido);

    let comprar = document.createElement("button")
    comprar.innerText = "Añadir al carrito";
    comprar.className = "comprar";

    contenido.appendChild(comprar);

    comprar.addEventListener("click", () =>{
    const repeat = carrito.some ((repeatProduct) => repeatProduct.id === producto.id)
        
        if (repeat){
            carrito.map((prod)=>{
                if(prod.id === producto.id){
                    prod.cantidad++;
                }
            })
        }else{
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                img: producto.img,
                cantidad: producto.cantidad,
            });
        }
        contarCarrito();
        guardarLocal();
    });
});


const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h2 class="modal-header-titulo">Carrito de productos seleccionados</h2>
    `;
    modalContainer.appendChild(modalHeader);
     
    const modalButton = document.createElement("h2")
    modalButton.innerHTML = "Salir";
    modalButton.className = "modal-header-button"
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.appendChild(modalButton);

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p class="precio">${producto.precio} $</p>
        <br></br>
        <span class= "restar"> - </span>
        <p>Cantidad: ${producto.cantidad}</p>     
        <span class= "sumar"> + </span>
        <br></br>
        <p>Total: ${producto.cantidad * producto.precio}</p>
        <span class= "eliminar-productos"> Eliminar producto </span>
        `;

    modalContainer.appendChild(carritoContent);

    let restar = carritoContent.querySelector(".restar")
    restar.addEventListener("click", () =>{
       if(producto.cantidad !== 1){
        producto.cantidad--;
       } 
        pintarCarrito();
        guardarLocal();
    })

    let sumar = carritoContent.querySelector(".sumar")
    sumar.addEventListener("click", () =>{
        producto.cantidad++;
        guardarLocal();
        pintarCarrito();
    })

    let eliminarProductos = carritoContent.querySelector(".eliminar-productos");
    eliminarProductos.addEventListener("click", () => {
        eliminar(producto.id)
    })
    //let eliminarProductos = document.createElement("span");
    //eliminarProductos.innerText = "Eliminar producto"
    //eliminarProductos.className ="eliminar-productos";
    //carritoContent.appendChild(eliminarProductos);

    //eliminarProductos.addEventListener("click", () => eliminar(producto.id))
    });

    
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalcompra = document.createElement("div");
    totalcompra.className = "total-content";
    totalcompra.innerHTML = `El total a pagar es: ${total} $`;
    modalContainer.appendChild(totalcompra);
}

verCarrito.addEventListener("click", pintarCarrito);




const eliminar = (id) =>{
    const encontrarId = carrito.find ((element) => element.id == id);
    carrito.splice(carrito.indexOf(encontrarId), 1);
       
    contarCarrito();
    guardarLocal();
    pintarCarrito();
}

const contarCarrito = () => {
    cantidadProductos.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadProductos.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}; 
contarCarrito();

const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

