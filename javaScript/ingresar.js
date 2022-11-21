const botonIngresar = document.getElementById("botonIngresar");
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

const mostrarResultado = (result) =>{
  if (result.isConfirmed) {
    Swal.fire({
      title: `Bienvenido ${result.value.login}`,
      imageUrl: result.value.avatar_url,
      imageHeight: 200
    })
  }
}
