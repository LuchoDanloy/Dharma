//CLASE PARA LOS PRODUCTOS. EN ESTE CASO PRENDAS
class Producto {
    constructor(id, nombre, descripcion, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

//ARREGLO CON NUSTROS PRODUCTOS
let productos = [];

//CREAMOS EL CARRITO VACIO
let carrito = [];


//SI HAY ALGO EN EL LOCALSTORAGE LO CARGAMOS AL CARRITO.
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito")); 
}

//MOSTRAR NIÑOS
const conjuntos = document.getElementById("niñosConjuntos")
conjuntos.addEventListener("click", () =>{
    inicializarProductos("../json/niños/conjuntos.json");
    mostrarTituloCategoria("NIÑOS");
    mostrarTituloGaleria("NIÑOS / CONJUNTOS");
})

//MOSTRAR HOMBRE
const camisaHombre = document.getElementById("hombreCamisas")
camisaHombre.addEventListener("click", () =>{
    inicializarProductos("../json/hombre/camisas.json");
    mostrarTituloCategoria("HOMBRE");
    mostrarTituloGaleria("HOMBRE / CAMISAS");
})

const jeansaHombre = document.getElementById("hombreJeans")
jeansaHombre.addEventListener("click", () =>{
    inicializarProductos("../json/hombre/jeans.json");
    mostrarTituloCategoria("HOMBRE");
    mostrarTituloGaleria("HOMBRE / JEANS");
})

//MOSTRAR MUJER
const pantalonesMujer = document.getElementById("mujerPantalones")
pantalonesMujer.addEventListener("click", () =>{
    inicializarProductos("../json/mujer/pantalones.json");
    mostrarTituloCategoria("MUJER");
    mostrarTituloGaleria("MUJER / PANTALONES");
})

//FUNCION PARA INICIALIZAR PRODUCTOS
const inicializarProductos = (url) => {
    productos = [];
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        productos = [];
        datos.forEach( producto => {
            const prod = new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.img);
            productos.push(prod);
        })
        console.log(productos);
    })
    .catch(error => console.log(error))
    .finally( () => mostrarproductos())
}

//TITULO CATEGORIA
const mostrarTituloCategoria = (titulo) => {
    const tituloCategoria = document.getElementById("tituloCategoria");
    tituloCategoria.textContent=titulo;
}

//TITULO GALERIA
const mostrarTituloGaleria = (titulo) => {
    const tituloGaleria = document.getElementById("tituloGaleria");
    tituloGaleria.textContent=titulo; 
}

//MODIFICAMOS EL DOM
const contenedorCards = document.getElementById("contenedorCards");

//FUNCION PARA MOSTRAR LAS TARJETAS EN EL HTML
const mostrarproductos = () => {
    console.log("mostrando productos");
    contenedorCards.innerHTML="";
    productos.forEach((producto) =>{
        const card= document.createElement("div");
        card.innerHTML= `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top" alt="foto galeria">
                    <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <div class="card-text stock">En Stock</div>
                    <p class="card-text precio mb-1">$${producto.precio}</p>
                    <a class="btn btn-outline-primary my-1" id="ver${producto.id}" >Ver</a>
                    <a class="btn btn-outline-dark" id="boton${producto.id}" >Agregar al Carrito</a>
                    </div>
                </div>
        `  
        //PARA PEGARLO 
        contenedorCards.appendChild(card);

        //AGREGAR LOS PRODUCTOS AL CARRITO.
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })

        //VER EL PRODUCTO
        const ver = document.getElementById(`ver${producto.id}`);
        ver.addEventListener("click", () => {
            verProducto(producto.id)
        })

    }) 
}


//FUNCION PARA AGREGAR AL CARRITO
const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        carrito.push(producto);
    }

    Toastify({
        text:"Producto Agregado correctamente",
        duration: 3000,
        gravity:"bottom",
        position:"right"
        
    }).showToast();

    //CARGAMOS AL LOCALSTORAGE
    localStorage.clear();
    localStorage.setItem("carrito",JSON.stringify(carrito));

    //LLAMADA A CALCULAR TOTAL;
    calcularTotal();
}

//VISUALIZAR PRODUCTO
const verProducto = (id) =>{
    const producto = productos.find((producto) => producto.id === id);
    console.log(producto.url);
    Swal.fire({
        title: producto.nombre,
        text: producto.descripcion,
        imageUrl: producto.img,
        imageHeight: 400,
        footer: '<a href="talles.html">VER TABLA DE TALLES</a>'
      })
}

//AUMENTAR CANDIDAD
const aumentarCantidad = (id) =>{
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }
    //CARGAMOS AL LOCALSTORAGE
    localStorage.clear();
    localStorage.setItem("carrito",JSON.stringify(carrito));
    mostrarCarrito();

    //LLAMADA A CALCULAR TOTAL;
    calcularTotal();
}

//REDUCIR CANDIDAD
const reducirCantidad = (id) =>{
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        if(productoEnCarrito.cantidad != 1){
            productoEnCarrito.cantidad--;
        }
    }
    //CARGAMOS AL LOCALSTORAGE
    localStorage.clear();
    localStorage.setItem("carrito",JSON.stringify(carrito));
    mostrarCarrito();

    //LLAMADA A CALCULAR TOTAL;
    calcularTotal();
}


//MOSTRAR EL CARRITO DE COMPRAS
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito= document.getElementById("verCarrito");

verCarrito.addEventListener("click",() => {
    mostrarCarrito();
})

//FUNCION QUE MUESTRA EL CARRITO CON OFFCANVAS DE BOOTSTRAP
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) =>{
        const offcanvas = document.createElement("div");
        offcanvas.innerHTML= ` 
            <div class="galeria card">
                <img src="${producto.img}" class="card-img-top w-50"  alt="foto galeria">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text precio">Importe Unit: $${producto.precio}</p>
                <p class="card-text">Cantidad: ${producto.cantidad} </p>
                <div class="d-flex justify-content-center my-1">
                    <button class="btn btn-outline-primary mx-1" id="agregar${producto.id}"> + </button>
                    <button class="btn btn-outline-primary mx-1" id="restar${producto.id}"> - </button>
                </div>
                <button class="btn btn-outline-danger" id="eliminar${producto.id}"> Eliminar Producto </button>
            </div>
        `
        //PARA PEGARLO 
        contenedorCarrito.appendChild(offcanvas);

        //ELIMINAR PRODUCTO DEL CARRO
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click",() => {
            eliminarDelCarro(producto.id);
        })

        //AUMENTAR CANTIDAD EN 1
        const suma = document.getElementById(`agregar${producto.id}`);
        suma.addEventListener("click",() => {
            aumentarCantidad(producto.id);
        })

        //AUMENTAR CANTIDAD EN 1
        const resta = document.getElementById(`restar${producto.id}`);
        resta.addEventListener("click",() => {
            reducirCantidad(producto.id);
        })

        //LLAMADA A CALCULAR TOTAL;
        calcularTotal();
    })
}
//FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRO
const eliminarDelCarro = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf((producto));
    carrito.splice(indice,1);
    mostrarCarrito();
    calcularTotal();

    //LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//FUNCION PARA VACIAR TODO EL CARRO
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    vaciarElCarro();
} )
const vaciarElCarro = () =>{
    carrito=[];
    mostrarCarrito();
    calcularTotal();
    
    //LIMPIAMOS EL LOCALSTORAGE 
    localStorage.clear();
}

//FUNCION PARA CALCULAR IMPORTE TOTAL DE PRODUCTOS
const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) =>{
        totalCompra += producto.cantidad * producto.precio;
    })
    total.innerText = `Total Compra: $${totalCompra}`;
}