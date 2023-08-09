// Definición de variables globales
let arrayDispositivos;
let arrayLugares;
let arrayResultados = [];

crearDevices();
crearPlaces();

function continuarRemoto() {
    const respuestaRemoto = document.querySelector('input[name="remoto"]:checked').value;
    document.getElementById('pregunta-remoto').style.display = 'none';
    if (respuestaRemoto === 'SI') {
        document.getElementById('pregunta-dispositivos').style.display = 'block';
    } else {
        mensaje();
    }
}

function mensaje() {
    document.getElementById('mensaje').style.display = 'block';
}

function cargarTiempo() {
    const tiempoCelular = document.getElementById('tiempoCelular').value;
    const tiempoNotebook = document.getElementById('tiempoNotebook').value;
    const tiempoPc = document.getElementById('tiempoPc').value;

    if (!validarEntero(tiempoCelular) || !validarEntero(tiempoNotebook) || !validarEntero(tiempoPc)) {
        Swal.fire({
            icon: 'error',
            title: 'Pecado Capital',
            text: 'Soy el cartel rabioso, sos jodido eh!. Por el bien de la humanidad colocá solo números enteros, si papito?',
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
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    // Recuperar objeto del localStorage
    const usuarioJSON = localStorage.getItem('usuario');
    const usuarioGuardado = JSON.parse(usuarioJSON);

    console.log('Datos del usuario JSON: ' + usuarioJSON);

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

    // Mostrar datos de dispositivos
    resultadoDiv.innerHTML += '<h2>Datos de dispositivos:</h2>';
    resultadoDiv.innerHTML += '<ul>';
    for (const dispositivo in arrayDispositivos) {
        const infoDispositivo = arrayDispositivos[dispositivo];
        resultadoDiv.innerHTML += '<li>' + infoDispositivo.marca + ' ' + infoDispositivo.modelo + ' (' + infoDispositivo.tipo + '): ' + infoDispositivo.tiempo + ' horas</li>';
    }
    resultadoDiv.innerHTML += '</ul>';

    // Mostrar datos de lugares
    resultadoDiv.innerHTML += '<h2>Datos de lugares:</h2>';
    resultadoDiv.innerHTML += '<ul>';
    for (const lugar in arrayLugares) {
        const infoLugar = arrayLugares[lugar];
        resultadoDiv.innerHTML += '<li>' + infoLugar.lugar + ' - Tiempo de uso: ' + infoLugar.tiempo + ' horas</li>';
    }
    resultadoDiv.innerHTML += '</ul>';

    // Mostrar resultado final
    resultadoDiv.innerHTML += '<h2>Resultado del puesto de trabajo:</h2>';
    resultadoDiv.innerHTML += '<p>Dispositivos ★★★★☆</p>';
    resultadoDiv.innerHTML += '<p>Ergonomía ★★☆☆☆</p>';
    resultadoDiv.innerHTML += '<p>Ambiente ★☆☆☆☆</p>';

    resultadoDiv.innerHTML += '<h2>Calculo detallado sobre el ARRAY (queda para la proxima entrega graficos y cosas bonitas!):</h2>';
    resultadoDiv.innerHTML += '<p>Dispositivos: ' + arrayDispositivos.mobile.resultado + '</p>';
    resultadoDiv.innerHTML += '<p>Ergonomía: ' + arrayDispositivos.notebook.resultado + '</p>';
    resultadoDiv.innerHTML += '<p>Ambiente: ' + arrayDispositivos.desktop.resultado + '</p>';
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

    const userDevicesMobile = new userDevices("Apple", "iphone", "celular");
    const userDevicesNotebook = new userDevices("Asus", "Satellite", "notebook");
    const userDevicesDesktop = new userDevices("Dell", "Miracle", "desktop");

    arrayDispositivos = {
        mobile: userDevicesMobile,
        notebook: userDevicesNotebook,
        desktop: userDevicesDesktop,
    };
}

// Creación de arrays de lugares
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




