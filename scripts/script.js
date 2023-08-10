// IMPORTANTE: las partes del código "comentadas" se dejaron a propósito ya que quiero mostrar lo aprendido y puesto en práctica
// pero por otro lado, tuve que reemplazarlas por programación con AJAX y Fetch para cumplir con los requisitos de la entrega

// Definición de variables globales
let arrayDispositivos;
let arrayLugares;
let arrayResultados = [];

crearDevices(); //está hecho así para evitar la carga del usuario 
crearPlaces();

function continuarRemoto() {
    const remotoSi = document.getElementById('remoto_si');
    const remotoNo = document.getElementById('remoto_no');

    if (remotoSi.checked || remotoNo.checked) {
        document.getElementById('pregunta-remoto').style.display = 'none';
        document.getElementById('boton-continuar').style.display = 'none';
        document.getElementById('intro').style.display = 'none';

        const respuestaRemoto = document.querySelector('input[name="remoto"]:checked').value;
        if (respuestaRemoto === 'SI') {
            document.getElementById('seccion2').style.display = 'block';
        } else {
            mensaje();
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, selecciona una opción.',
        });
    }
}


function mensaje() {
    document.getElementById('mensaje').style.display = 'block';
    document.getElementById('pregunta-remoto').style.display = 'none';
    document.getElementById('boton-continuar').style.display = 'none';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('seccion2').style.display = 'none';
}

function cargarTiempo1() {
    let respuestasValidas = validarPreguntas();
    if (!respuestasValidas === 4) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, selecciona una opción por cada pregunta.',
        });
    } else {
        document.getElementById('seccion2').style.display = 'none';
        document.getElementById('pregunta-dispositivos').style.display = 'block';
    }
}

function validarPreguntas() { //Probando otra forma de validar varios radios!!
    let contestadas = 0;
    const respuestaPregunta1 = document.querySelector('input[name="pregunta1"]:checked').value;
    if (respuestaPregunta1 && respuestaPregunta1 != null) {
        contestadas++;
    };
    const respuestaPregunta2 = document.querySelector('input[name="pregunta2"]:checked').value;
    if (respuestaPregunta2 && respuestaPregunta2 != null) {
        contestadas++;
    };
    const respuestaPregunta3 = document.querySelector('input[name="pregunta3"]:checked').value;
    if (respuestaPregunta3 && respuestaPregunta3 != null){
        contestadas++;
    };
    const respuestaPregunta4 = document.querySelector('input[name="pregunta4"]:checked').value;
    if (respuestaPregunta4 && respuestaPregunta4 != null) {
        contestadas++;
    };
    return contestadas;
}



function cargarTiempo2() {
    document.getElementById("pregunta-dispositivos").style.display = "block";

    const tiempoCelular = document.getElementById('tiempoCelular').value;
    const tiempoNotebook = document.getElementById('tiempoNotebook').value;
    const tiempoPc = document.getElementById('tiempoPc').value;

    if (!validarEntero(tiempoCelular) || !validarEntero(tiempoNotebook) || !validarEntero(tiempoPc)) {
        Swal.fire({
            icon: 'error',
            title: 'Pecado Capital',
            text: 'Soy el cartel rabioso, sos jodido eh!. Por el bien de la humanidad colocá solo números enteros, por favor!',
        });
        return;
    }

    arrayDispositivos.mobile.tiempo = parseInt(tiempoCelular);
    arrayDispositivos.notebook.tiempo = parseInt(tiempoNotebook);
    arrayDispositivos.desktop.tiempo = parseInt(tiempoPc);

    let mob = evaluar(arrayDispositivos.mobile.tipo, arrayDispositivos.mobile.tiempo);
    let not = evaluar(arrayDispositivos.notebook.tipo, arrayDispositivos.notebook.tiempo);
    let desk = evaluar(arrayDispositivos.desktop.tipo, arrayDispositivos.desktop.tiempo);

    arrayDispositivos.mobile.resultado = mob;
    arrayDispositivos.notebook.resultado = not;
    arrayDispositivos.desktop.resultado = desk;

    let dispo = calcularDispositivos(mob, not, desk);
    let ergo = '';
    let ambiente = '';
    arrayResultados = [dispo, ergo, ambiente];

    mostrarResultados();
}

function validarEntero(valor) {
    return Number.isInteger(Number(valor));
}

function mostrarResultados() {
    document.getElementById("pregunta-dispositivos").style.display = "none";

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    // Recuperar objeto del localStorage


    const usuarioJSON = localStorage.getItem('usuario');
    const usuarioGuardado = JSON.parse(usuarioJSON);


    // Mostrar datos del usuario 
    resultadoDiv.innerHTML += '<h2>Datos del Usuario:</h2>';
    resultadoDiv.innerHTML += '<ul>';
    for (const propiedad in usuarioGuardado) {
        const valor = usuarioGuardado[propiedad];
        const p = document.createElement('li');
        p.textContent = `${propiedad}: ${valor}`;
        resultadoDiv.appendChild(p);
    }
    resultadoDiv.innerHTML += '</ul>';
    resultadoDiv.innerHTML += '<br>';


    // Mostrar datos de dispositivos
    resultadoDiv.innerHTML += '<h2>Datos de dispositivos:</h2>';
    resultadoDiv.innerHTML += '<ul>';
    for (const dispositivo in arrayDispositivos) {
        const infoDispositivo = arrayDispositivos[dispositivo];
        resultadoDiv.innerHTML += '<li>' + infoDispositivo.marca + ' ' + infoDispositivo.modelo + ' (' + infoDispositivo.tipo + '): ' + infoDispositivo.tiempo + ' horas</li>';
    }
    resultadoDiv.innerHTML += '</ul>';
    resultadoDiv.innerHTML += '<br>';


    


    // Mostrar resultado final
  
    resultadoDiv.innerHTML += '<h2>Calculo detallado sobre el ARRAY:</h2>';
    resultadoDiv.innerHTML += '<p>Dispositivos: ' + arrayDispositivos.mobile.resultado + '</p>';
    resultadoDiv.innerHTML += '<p>Ergonomía: ' + arrayDispositivos.notebook.resultado + '</p>';
    resultadoDiv.innerHTML += '<p>Ambiente: ' + arrayDispositivos.desktop.resultado + '</p>';
    resultadoDiv.innerHTML += '<br>';

    resultadoDiv.innerHTML += '<h2>Resultado del puesto de trabajo:</h2>';
    resultadoDiv.innerHTML += '<p>Dispositivos ★★★★☆</p>'; //por ahora la info es estática, no me dió el tiempo para que sea representativa del cálculo.
    resultadoDiv.innerHTML += '<p>Ergonomía ★★☆☆☆</p>';
    resultadoDiv.innerHTML += '<p>Ambiente ★☆☆☆☆</p>';
    resultadoDiv.innerHTML += '<br>';

    // Mostrar datos de lugares
       resultadoDiv.innerHTML += '<h2>Datos de lugares:</h2>';
       resultadoDiv.innerHTML += '<p>Los resultados anteriores están basados en tu información sobre cantidad de horas por lugar de trabajo:</p>';

       fetch('https://raw.githubusercontent.com/thinkbigwork/PFJS_Mendez/main/places.json')
           .then( (res) => res.json())
           .then( (data) => {
   
               data.forEach((lugar) => {
                   const li = document.createElement('li')
                   li.innerHTML = `
                       <h4>${lugar.nombre}</h4>
                       <p>${lugar.tiempo} horas</p>
                       <hr/>
                   `
                   resultadoDiv.append(li)
               })
       })
       resultadoDiv.innerHTML += '<br>';
}

// Creación de arrays de dispositivos
function crearDevices() {
    class userDevices {
        constructor(marca, modelo, tipo, tiempo, resultado) {
            this.marca = marca;
            this.modelo = modelo;
            this.tipo = tipo;
            this.tiempo = tiempo;
            this.resultado = resultado;
        }
    } 

 

    // Creación de arrays de dispositivos
    const userDevicesMobile = new userDevices("Apple", "iphone", "celular");
    const userDevicesNotebook = new userDevices("Asus", "Satellite", "notebook");
    const userDevicesDesktop = new userDevices("Dell", "Miracle", "desktop");

    arrayDispositivos = {
        mobile: userDevicesMobile,
        notebook: userDevicesNotebook,
        desktop: userDevicesDesktop,
    };
}

// Creación de arrays de lugares (mantengo el código para que un futuro el usuario complete los datos)
// Esta parte está siendo reemplazada por el archivo places.json
function crearPlaces() {
    class userPlaces {
        constructor(lugar, tiempo) {
            this.lugar = lugar;
            this.tiempo = tiempo;
        }
    } 

    const userPlacesSillon = new userPlaces("sillon", 2);
    const userPlacesEscritorio = new userPlaces("escritorio", 4);
    const userPlacesMesa = new userPlaces("mesa", 1);
    const userPlacesCama = new userPlaces("cama", 1);

    arrayLugares = {
        sillon: userPlacesSillon,
        escritorio: userPlacesEscritorio,
        mesa: userPlacesMesa,
        cama: userPlacesCama,
    };
}

function evaluar(tipo, valor) {
    let horasMobile = 4;
    let horasNotebook = 6;
    let horasDesktop = 8;

    function factorSeguridad(numero, porcentaje) {
        numero = numero - numero * porcentaje / 100;
        return numero;
    }

    switch (tipo) {
        case 'celular': {
            let resultadoMobile = factorSeguridad(valor, 5) / horasMobile;
            console.log('Resultado switch Mobile: ' + resultadoMobile); // muestra interna para control
            return resultadoMobile;
        }
        case 'notebook': {
            let resultadoNotebook = factorSeguridad(valor, 5) / horasNotebook;
            console.log('Resultado switch Notebook: ' + resultadoNotebook); // muestra interna para control
            return resultadoNotebook;
        }
        case 'desktop': {
            let resultadoDesktop = factorSeguridad(valor, 5) / horasDesktop;
            console.log('Resultado switch Desktop: ' + resultadoDesktop); // muestra interna para control
            return resultadoDesktop; 
        }
        default: {
            console.log('Entramos en default');
            break;
        }
    }
}

function calcularDispositivos(mob, not, desk) {
    let prom = (mob + not + desk) / 3;
    return prom;
}
