//SI HAY ALGO EN EL LOCALSTORAGE LO CARGAMOS AL CARRITO.
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito")); 
}


//MODIFICAMOS EL DOM

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