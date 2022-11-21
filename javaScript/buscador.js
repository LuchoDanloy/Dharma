const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("botonBuscar");

const filtrar = () =>{
    contenedorCards.innerHTML = '';
    
    const texto = buscador.value.toLowerCase();
    for ( let producto of productos ){
        let nombre = producto.nombre.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            contenedorCards.innerHTML += `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top" alt="foto galeria">
                    <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <div class="card-text stock">En Stock</div>
                    <p class="card-text precio mb-1">$${producto.precio}</p>
                    <a class="btn btn-outline-primary my-1" href="productoView.html" >Ver</a>
                    <a class="btn btn-outline-dark" id="boton${producto.id}" >Agregar al Carrito</a>
                    </div>
                </div>
            `  
        }

    }
    if ( contenedorCards.innerHTML === '' ){
        contenedorCards.innerHTML = `<h2><li>Producto no encontrado</li></h2>`
    }

}

//EVENTO ENTER LLAMA AL CLICK DE BUSCAR
buscador.addEventListener('keypress', function(event){
    console.log("Entra al buscar por key")
    if (event.key==="Enter"){
        document.getElementById("botonBuscar").click();
    }
});

//CLICK DE BUSCAR LLAMA A FILTRAR
botonBuscar.addEventListener('click', filtrar);

