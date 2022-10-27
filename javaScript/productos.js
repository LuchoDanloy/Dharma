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

//DEFINO LOS OBJETOS
const florencia = new Producto(1, "Conjunto Florencia", "Conjunto de algodon.", 5000, "https://www.surmujer.cl/17854_pic/cdn-5_Ch%C3%A1ndal-de-ni%C3%B1os-2020-oto%C3%B1o-sudadera-de-manga-larga.jpg");
const silvana = new Producto(2, "Conjunto Silvana", "Conjunto de morley.", 6000, "https://ae01.alicdn.com/kf/H43e91c025b0441fd8c251024fe0870ccc/Nuevo-dise-o-2021-de-moda-de-las-mujeres-conjuntos-de-sudaderas-Casual-primavera-top-corto.jpg_Q90.jpg_.webp");
const bahia = new Producto(3, "Sweater Bahia", "Sweater de lana.", 5000, "https://primedia.primark.com/s/primark/210039957_ms?locale=en-*,sl-*,*&$product-thumbnail$");
const claudia = new Producto(4, "Conjunto Claudia", "conjunto de seda.", 8000, "https://ae01.alicdn.com/kf/H9f65ff3b70ac432aaa0b7f4ab05d7d03i/Traje-de-gasa-para-ni-as-conjunto-de-ropa-sin-mangas-pantalones-cortos-de-ocio-conjuntos.jpg");
const beatriz = new Producto(5, "Conjunto Beatriz", "conjunto frizado.", 9000, "https://ae01.alicdn.com/kf/Hacf6f84bc5624c48bdeb3f9ed18ccf29I/Conjuntos-de-12-prendas-de-vestir-para-ni-as-10-Pantalones-cortos-traje-para-beb-s.jpg");
const zoe = new Producto(6, "Conjunto Zoe", "Conjunto niña.", 5000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnoxtx44FrHVst9cth8kmMkdywkC2jL-m3u6xZY-BVbKetUl6eUhaij13Ld6T4b-IHSIE&usqp=CAU");
const lara = new Producto(7, "Conjunto Lara", "Calza y remera.", 3000, "https://ae01.alicdn.com/kf/HTB17Iv7RVXXXXc6XpXXq6xXFXXXw/Conjunto-de-ropa-para-ni-os-peque-os-de-0-a-24-meses-camiseta-con-pesta.jpg");
const rock = new Producto(8, "Campera Rock", "campera de cuero.", 18000, "https://rotulwork.es/wp-content/uploads/2018/11/220-WORKSHELL-SPORT-S8640-700x700.jpg");
const sleep = new Producto(9, "Conjunto Sleep", "Pijama de seda.", 4000, "https://media.nidux.net/pull/700/700/10876/8546-product-626868a98c0ba-4080102103.jpg");
const bed = new Producto(10, "Conjunto Bed", "Pijama de algodon.", 5000, "https://media.nidux.net/pull/700/700/10876/9636-product-62cda675a264f-4080103002.jpg");

//ARREGLO CON TODOS NUSTROS PRODUCTOS
const productos = [florencia, silvana, bahia, claudia, beatriz, zoe, lara, rock, sleep, bed];

//CREAMOS EL CARRITO VACIO
let carrito = [];

//SI HAY ALGO EN EL LOCALSTORAGE LO CARGAMOS AL CARRITO.
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito")); 
}


//MODIFICAMOS EL DOM
const contenedorCards = document.getElementById("contenedorCards");
//FUNCION PARA MOSTRAR LAS TARJETAS EN EL HTML
const mostrarproductos = () => {
    productos.forEach((producto) =>{
        const card= document.createElement("div");
        card.innerHTML= `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top" alt="foto galeria">
                    <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <div class="card-text">${producto.descripcion}</div>
                    <div class="card-text stock">En Stock</div>
                    <p class="card-text precio mb-1">$${producto.precio}</p>
                    <a class="btn btn-outline-primary my-1" href="productoView.html" >Ver</a>
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

    //CARGAMOS AL LOCALSTORAGE
    localStorage.clear();
    localStorage.setItem("carrito",JSON.stringify(carrito));

    //LLAMADA A CALCULAR TOTAL;
    calcularTotal();
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

//FUNCION QUE SE EJECUTA CUANDO SE CARGA LA PAGINA
mostrarproductos();

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