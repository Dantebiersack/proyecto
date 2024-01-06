function insertar() {
    let ruta = "http://localhost:8080/SICEFA_web/api/sucursal/insert";

    let v_nombre = document.getElementById("txtNombreSucursal").value;
    let v_titular = document.getElementById("txtNombreTitular").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_domicilio = document.getElementById("txtDomicilio").value;
    let v_colonia = document.getElementById("txtColonia").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_codigoPostal = document.getElementById("txtCP").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_longitud = document.getElementById("txtLongitud").value;
    let v_latitud = document.getElementById("txtLatitud").value;

    let sucursal = {
        nombre: v_nombre,
        titular: v_titular,
        rfc: v_rfc,
        domicilio: v_domicilio,
        colonia: v_colonia,
        ciudad: v_ciudad,
        codigoPostal: v_codigoPostal,
        telefono: v_telefono,
        estado: v_estado,
        longitud: v_longitud,
        latitud: v_latitud
    };
    let params = {datosSucursal: JSON.stringify(sucursal)};
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };
    fetch(ruta, requestOptions)
            .then(
                    function (data) {
                        return data.json();
                    })
            .then(function (json)
            {
                console.log(json);
                CargarTabla();
                alert("Nombre: " + json.nombre);
            }
            );
    vaciarFormulario();
}

function CargarTabla() {
    let ruta = "http://localhost:8080/SICEFA_web/api/sucursal/getall";
    fetch(ruta)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                // Obtener la tabla y su cuerpo
                const tablaRegistros = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];

                // Limpiar la tabla
                tablaRegistros.innerHTML = "";

                // Recorrer los datos y agregar filas a la tabla
                data.forEach(function (fila) {
                    const nuevaFila = tablaRegistros.insertRow(-1);

                    const idCell = nuevaFila.insertCell(0);
                    idCell.innerHTML = fila.idSucursal;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const titularCell = nuevaFila.insertCell(2);
                    titularCell.innerHTML = fila.titular;

                    const rfcCell = nuevaFila.insertCell(3);
                    rfcCell.innerHTML = fila.rfc;

                    const domicilioCell = nuevaFila.insertCell(4);
                    domicilioCell.innerHTML = fila.domicilio;

                    const coloniaCell = nuevaFila.insertCell(5);
                    coloniaCell.innerHTML = fila.colonia;

                    const ciudadCell = nuevaFila.insertCell(6);
                    ciudadCell.innerHTML = fila.ciudad;

                    const codigoPostalCell = nuevaFila.insertCell(7);
                    codigoPostalCell.innerHTML = fila.codigoPostal;

                    const telefonoCell = nuevaFila.insertCell(8);
                    telefonoCell.innerHTML = fila.telefono;

                    const estadoCell = nuevaFila.insertCell(9);
                    estadoCell.innerHTML = fila.estado;

                    const longitudCell = nuevaFila.insertCell(10);
                    longitudCell.innerHTML = fila.longitud;

                    const latitudCell = nuevaFila.insertCell(11);
                    latitudCell.innerHTML = fila.latitud;

                    const estatusCell = nuevaFila.insertCell(12);
                    estatusCell.innerHTML = fila.estatus;

                    // Asignar un evento clic a la fila para llenar los campos
                    nuevaFila.addEventListener("click", function () {
                        document.getElementById("txtIdSucursal").value = fila.idSucursal;
                        document.getElementById("txtNombreSucursal").value = fila.nombre;
                        document.getElementById("txtNombreTitular").value = fila.titular;
                        document.getElementById("txtRFC").value = fila.rfc;
                        document.getElementById("txtDomicilio").value = fila.domicilio;
                        document.getElementById("txtCiudad").value = fila.ciudad;
                        document.getElementById("txtCP").value = fila.codigoPostal;
                        document.getElementById("txtTelefono").value = fila.telefono;
                        document.getElementById("txtEstado").value = fila.estado;
                        document.getElementById("txtLongitud").value = fila.longitud;
                        document.getElementById("txtLatitud").value = fila.latitud;
                        document.getElementById("txtEstatus").value = fila.estatus;
                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });

}

function actualizarSucursal() {
    let ruta = "http://localhost:8080/SICEFA_web/api/sucursal/update";

    let v_nombre, v_titular, v_rfc, v_domicilio, v_colonia, v_ciudad, v_codigoPostal, v_telefono, v_estado, v_longitud, v_latitud;

    v_idSucursal = document.getElementById("txtIdSucursal").value;
    v_nombre = document.getElementById("txtNombreSucursal").value;
    v_titular = document.getElementById("txtNombreTitular").value;
    v_rfc = document.getElementById("txtRFC").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_colonia = document.getElementById("txtColonia").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_codigoPostal = document.getElementById("txtCP").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_estado = document.getElementById("txtEstado").value;
    v_longitud = document.getElementById("txtLongitud").value;
    v_latitud = document.getElementById("txtLatitud").value;

    let sucursal = {
        idSucursal: v_idSucursal,
        nombre: v_nombre,
        titular: v_titular,
        rfc: v_rfc,
        domicilio: v_domicilio,
        colonia: v_colonia,
        ciudad: v_ciudad,
        codigoPostal: v_codigoPostal,
        telefono: v_telefono,
        estado: v_estado,
        longitud: v_longitud,
        latitud: v_latitud
    };

    let params = {
        datosSucursal: JSON.stringify(sucursal)
    };

    alert("Datos de la sucursal" + JSON.stringify(params));

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(
                    function (data) {
                        return data.json();
                    })
            .then(function (json)
            {
                console.log(json);
                CargarTabla();
                vaciarFormulario();
            }
            );
}

function eliminarSucursal() {
    let ruta = "http://localhost:8080/SICEFA_web/api/sucursal/eliminarSucursal";

    let v_idSucursal;

    v_idSucursal = document.getElementById("txtIdSucursal").value;

    let sucursal = {
        idSucursal: v_idSucursal
    };

    let params = {
        datosSucursal: JSON.stringify(sucursal)
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(
                    function (data) {
                        return data.json();
                    })
            .then(function (json)
            {
                console.log(json);
                CargarTabla();
                vaciarFormulario();
            }
            );
}
function buscarSucursal() {
    let ruta = "http://localhost:8080/SICEFA_web/api/sucursal/buscarSucursal";
    let busqueda = document.getElementById("txtBusqueda").value.trim();
    if (busqueda === "") {
        CargarTabla();
        return;
    }
    fetch(ruta + "?busqueda=" + busqueda)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                // Obtener la tabla y su cuerpo
                const tablaRegistros = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];

                // Limpiar la tabla
                tablaRegistros.innerHTML = "";

                // Recorrer los datos y agregar filas a la tabla
                data.forEach(function (fila) {
                    const nuevaFila = tablaRegistros.insertRow(-1);

                    const idCell = nuevaFila.insertCell(0);
                    idCell.innerHTML = fila.idSucursal;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const titularCell = nuevaFila.insertCell(2);
                    titularCell.innerHTML = fila.titular;

                    const rfcCell = nuevaFila.insertCell(3);
                    rfcCell.innerHTML = fila.rfc;

                    const domicilioCell = nuevaFila.insertCell(4);
                    domicilioCell.innerHTML = fila.domicilio;

                    const coloniaCell = nuevaFila.insertCell(5);
                    coloniaCell.innerHTML = fila.colonia;

                    const ciudadCell = nuevaFila.insertCell(6);
                    ciudadCell.innerHTML = fila.ciudad;

                    const codigoPostalCell = nuevaFila.insertCell(7);
                    codigoPostalCell.innerHTML = fila.codigoPostal;

                    const telefonoCell = nuevaFila.insertCell(8);
                    telefonoCell.innerHTML = fila.telefono;

                    const estadoCell = nuevaFila.insertCell(9);
                    estadoCell.innerHTML = fila.estado;

                    const longitudCell = nuevaFila.insertCell(10);
                    longitudCell.innerHTML = fila.longitud;

                    const latitudCell = nuevaFila.insertCell(11);
                    latitudCell.innerHTML = fila.latitud;

                    const estatusCell = nuevaFila.insertCell(11);
                    estatusCell.innerHTML = fila.estatus;

                    // Asignar un evento clic a la fila para llenar los campos
                    nuevaFila.addEventListener("click", function () {
                        document.getElementById("txtIdSucursal").value = fila.idSucursal;
                        document.getElementById("txtNombreSucursal").value = fila.nombre;
                        document.getElementById("txtNombreTitular").value = fila.titular;
                        document.getElementById("txtRFC").value = fila.rfc;
                        document.getElementById("txtDomicilio").value = fila.domicilio;
                        document.getElementById("txtCiudad").value = fila.ciudad;
                        document.getElementById("txtCP").value = fila.codigoPostal;
                        document.getElementById("txtTelefono").value = fila.telefono;
                        document.getElementById("txtEstado").value = fila.estado;
                        document.getElementById("txtLongitud").value = fila.longitud;
                        document.getElementById("txtLatitud").value = fila.latitud;
                        document.getElementById("txtEstatus").value = fila.estatus;
                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}

function vaciarFormulario() {
    document.getElementById("txtIdSucursal").value = "";
    document.getElementById("txtNombreSucursal").value = "";
    document.getElementById("txtNombreTitular").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtDomicilio").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtLongitud").value = "";
    document.getElementById("txtLatitud").value = "";
    document.getElementById("txtEstatus").value = "";
}



//// Asegúrate de que H se haya definido correctamente en el alcance global
//const H = window.H;
//
//// Configura la plataforma de HERE Maps con tu API Key
//const platform = new H.service.Platform({
//    apikey: 'KJvh5AlL9aj_GvlzmwRFW88Rxw624tNDfHY3hfkaSzY'
//});
//
//const utlLat=21.070148173941405;
//const utlLong=-101.5744665165302;
//
//// Variables globales para los mapas
//let mapSimple, mapMarker, mapDirections;
//
//// Función para cargar un mapa con marcador
//function cargarMapaConMarcador() {
//    // Selecciona el contenedor del mapa
//    const mapContainer = document.getElementById('map-container-marker');
//    mapContainer.innerHTML= "";
//    
//    // Crea capas de mapas por defecto
//    const defaultLayers = platform.createDefaultLayers();
//
//    // Crea un mapa en el contenedor con capa de mapa normal
//    mapMarker = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
//        center: {lat: 21.070148173941405, lng: -101.5744665165302}, // Coordenadas de inicio
//        zoom: 10 // Nivel de zoom inicial
//    });
//
//    // Habilitar eventos de interacción en el mapa con marcador
//    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapMarker));
//    const ui = H.ui.UI.createDefault(mapMarker, defaultLayers);
//
//    // Permite desplazamiento y zoom
//    mapMarker.addEventListener('tap', function (evt) {
//        if (evt.target instanceof H.map.Marker) {
//            // Evita que el mapa se mueva cuando se hace clic en un marcador
//            return;
//        }
//        // Habilita el desplazamiento y zoom en el mapa con marcador
//        mapMarker.setBehavior(behavior);
//    });
//
//    // Obtén las coordenadas de latitud y longitud desde los campos de entrada
//    const latitud = parseFloat(document.getElementById('txtLongitud').value);
//    const longitud = parseFloat(document.getElementById('txtLatitud').value);
//
//    // Verifica si las coordenadas son válidas y agrega un marcador
//    if (!isNaN(latitud) && !isNaN(longitud)) {
//        const marker = new H.map.Marker({lat: latitud, lng: longitud});
//        mapMarker.addObject(marker);
//    }
//}