let usuario= "";
let imagen = "";


const datosUsuario= document.getElementById("datosUsuario");
const botonIngresar = document.getElementById("botonIngresar");
const botonSalir = document.getElementById("botonSalir");

//SI EN EL LOCALSTORAGE ESTA EL USUARIO E IMEGEN LA CARGAMOS
if(localStorage.getItem("usuario")){
  usuario = localStorage.getItem("usuario"); 
  imagen = localStorage.getItem("imagenUsuario"); 
  
  datosUsuario.innerHTML="";
  const nombreUsuario = document.createElement("p");
  nombreUsuario.innerHTML= ` 
      <img src="${imagen}" alt="icono ingresar">
      <p>${usuario}</p>
    `
  datosUsuario.appendChild(nombreUsuario);

  datosUsuario.style.display = 'block';
  botonIngresar.style.display = 'none';
  botonSalir.style.display = 'block';

}


botonIngresar.addEventListener("click", () => {
  Swal.fire({
    title: 'Ingrese su usuario de GitHub',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Buscar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        Swal.showValidationMessage(
          ` ${error} - No se encontro el usuario`
        )
      }) 
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    mostrarResultado(result);
  })

});

botonSalir.addEventListener("click", () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Hasta Luego!',
    showConfirmButton: false,
    timer: 1500
  })
  botonIngresar.style.display = 'block';
  botonSalir.style.display = 'none';
  datosUsuario.style.display = 'none';

  localStorage.removeItem('usuario');
  localStorage.removeItem('imagenUsuario');
});

const mostrarResultado = (result) =>{
  if (result.isConfirmed) {
    usuario = result.value.login;
    imagen = result.value.avatar_url;
    Swal.fire({
      title: `Bienvenido ${result.value.login}`,
      imageUrl: result.value.avatar_url,
      imageHeight: 200
    })
    cargarUsuario();
  }
}

const cargarUsuario = () => {

  datosUsuario.innerHTML="";
  const nombreUsuario = document.createElement("p");
  nombreUsuario.innerHTML= ` 
      <img src="${imagen}" alt="icono ingresar">
      <p>${usuario}</p>
    `
  datosUsuario.style.display = 'block';
  botonIngresar.style.display = 'none';
  botonSalir.style.display = 'block';
  //PARA PEGARLO 
  datosUsuario.appendChild(nombreUsuario);

  localStorage.setItem("usuario",usuario);
  localStorage.setItem("imagenUsuario",imagen);
}