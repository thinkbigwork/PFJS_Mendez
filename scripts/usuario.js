// Definición de variables globales
let nombre = '';
let password = '';
let email = '';

// Funcion para revisar si el usuario ya se encuentra logueado
function revisarUsuario(){
    if (localStorage.getItem("usuario") != null) {
        //mostrar info de login y boton de cierre de sesion
        //mostrar menu Evaluar ACTIVO
        console.log("usuario logueado - revisarUsuario");
        loginExitoso();

      } else {
        //mostrar form de login
        //Mostrar menu Evaluar DESACTIVADO
        console.log("usuario NOlogueado - revisarUsuario");
        cerrarSesion();
      }
}

// Función de inicio de Sesion
function iniciarSesion() {
  nombre = document.getElementById('nombreInput').value.trim();
  email = document.getElementById('emailInput').value.trim();
  password = document.getElementById('passwordInput').value.trim();

  if (nombre === '' || password === '' || email === '') {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa todos los campos.',
      });
      return;
  }
  
  if (!validateEmail(email)) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El email no es válido. El formato debe ser nombre@texto.com',
      });
      return;
  }

      function validateEmail(casilla){
          var validarEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
          if( validarEmail.test(casilla) ){
              return true;
          }else{
              return false;
          } 
        /*   validarEmail.test(casilla)?true:false; */ //no está funcionado, revisar
      }
  
  if (password.length < 5) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La contraseña debe tener al menos 5 caracteres.',
      });
      return;
  }

  nombre = nombre.toUpperCase();

  // Guardar datos de usuario en el localStorage
  const usuario = {
      nombre: nombre,
      password: password,
      email: email,
  };
  const usuarioJSON = JSON.stringify(usuario);
  localStorage.setItem('usuario', usuarioJSON);

  Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tus datos fueron cargados',
      showConfirmButton: false,
      timer: 1500
  })

  // en caso de que no funcione SweetAlert
/*   document.getElementById('nombreInput').disabled = true;
  document.getElementById('emailInput').disabled = true;
  document.getElementById('passwordInput').disabled = true;
  document.getElementById('errorNombre').style.display = 'none';
  document.getElementById('errorEmail').style.display = 'none';
  document.getElementById('errorPassword').style.display = 'none'; */

  loginExitoso();
}


function loginExitoso() {
  document.getElementById('bienvenida').innerText = `¡Hola ${nombre} ya puedes comenzar a evaluar tu puesto de trabajo!`;
  document.getElementById('bienvenida').style.display = 'block';
  document.getElementById('evalConectLogin').style.display = 'block';
  document.getElementById('evalDescLogin').style.display = 'none';
  document.getElementById('logConectLogin').style.display = 'block';
  document.getElementById('logDescLogin').style.display = 'none';
/*   document.getElementById('evalDescIndex').style.display = 'block';
  document.getElementById('evalConectIndex').style.display = 'none'; */ //No pude lograr activar y descativar el menu en los otros html. Dejo uno de los bloques de muestra
  document.getElementById('form-head').style.display = 'none';
  document.getElementById('loginExitoso').style.display = 'block';
}

function cerrarSesion(){
  localStorage.removeItem("usuario");
  document.getElementById('bienvenida').style.display = 'none';
  document.getElementById('evalConectLogin').style.display = 'none';
  document.getElementById('evalDescLogin').style.display = 'block';
  document.getElementById('logConectLogin').style.display = 'none';
  document.getElementById('logDescLogin').style.display = 'block';
  document.getElementById('form-head').style.display = 'block';
  document.getElementById('loginExitoso').style.display = 'none';
}

window.onload = revisarUsuario;