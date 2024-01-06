
function inCliente() {
    let ruta = "http://localhost:8080/SICEFA_web/api/persona/cliente";

    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoP = document.getElementById("txtApellidoP").value;
    let v_apellidoM = document.getElementById("txtApellidoM").value;
    let v_genero = document.getElementById("genero").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_direccion = document.getElementById("direccion").value;
    let v_cod_postal = document.getElementById("CPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_fechaNacimiento = document.getElementById("txtBirth").value;
    let v_tel = document.getElementById("tel").value;
    let v_email = document.getElementById("corr").value;

    var partes = v_fechaNacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    v_fechaNacimiento = nuevoFormato.join("/");


    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoP,
        apellidoMaterno: v_apellidoM,
        genero: v_genero,
        fechaNacimiento: v_fechaNacimiento,
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_direccion,
        codigoPostal: v_cod_postal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_tel,
        foto: ""

    };


    let cliente = {
        persona: persona,
        email: v_email

    };

    let params = {cliente: JSON.stringify(cliente)};

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                console.log(cliente);
                CargarTabla();

            });
    clean();
}

function clean() {
    document.getElementById("txtIdPersona").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoP").value = "";
    document.getElementById("txtApellidoM").value = "";
    document.getElementById("genero").value = "M";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtCURP").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("CPostal").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtBirth").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("corr").value = "";
    document.getElementById("txtBuscar").value = "";
    document.getElementById("txtNombre").focus();
    

    personaSeleccionado = 0;
}


function CargarTabla() {
    let ruta = "http://localhost:8080/SICEFA_web/api/persona/getall";
    fetch(ruta)
            .then(function (data) {
                console.log(data);
                return data.json();
            })
            .then(function (data) {
                // Obtener la tabla y su cuerpo
                const tablaCliente = document.getElementById("tblCliente").getElementsByTagName('tbody')[0];

                // Limpiar la tabla
                tablaCliente.innerHTML = "";

                // Recorrer los datos y agregar filas a la tabla
                data.forEach(function (fila) {
                    const nuevaFila = tablaCliente.insertRow(-1);

                    const idCell = nuevaFila.insertCell(0);
                    idCell.innerHTML = fila.idPersona;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const apellidoPCell = nuevaFila.insertCell(2);
                    apellidoPCell.innerHTML = fila.apellidoPaterno;

                    const apellidoMaternoCell = nuevaFila.insertCell(3);
                    apellidoMaternoCell.innerHTML = fila.apellidoMaterno;

                    const telefonoCell = nuevaFila.insertCell(4);
                    telefonoCell.innerHTML = fila.telefono;

                    const emailCell = nuevaFila.insertCell(5);
                    emailCell.innerHTML = fila.email;

                    const fechaRegistroCell = nuevaFila.insertCell(6);
                    fechaRegistroCell.innerHTML = fila.fechaRegistro;

                    const estatusCell = nuevaFila.insertCell(7);
                    estatusCell.innerHTML = fila.estatus;                    

                    const generoCell = fila.genero;

                    const fechaNacimientoCell = fila.fechaNacimiento;

                    const rfcCell = fila.rfc;

                    const domicilioCell = fila.domicilio;

                    const codigoPostalCell = fila.codigoPostal;

                    const ciudadCell = fila.ciudad;

                    const estadoCell = fila.estado;

                    // Asignar un evento clic a la fila para llenar los campos
                    nuevaFila.addEventListener("click", function () {
                        
                        
                        document.getElementById("txtIdPersona").value = fila.idPersona;
                        document.getElementById("txtNombre").value = fila.nombre;
                        document.getElementById("txtApellidoP").value = fila.apellidoPaterno;
                        document.getElementById("txtApellidoM").value = fila.apellidoMaterno;
                        document.getElementById("genero").value = fila.genero;
                        document.getElementById("txtBirth").value = fila.fechaNacimiento;
                        document.getElementById("txtRFC").value = fila.rfc;
                        document.getElementById("txtCURP").value = fila.curp;
                        document.getElementById("direccion").value = fila.domicilio;
                        document.getElementById("CPostal").value = fila.codigoPostal;
                        document.getElementById("txtCiudad").value = fila.ciudad;
                        document.getElementById("txtEstado").value = fila.estado;
                        document.getElementById("tel").value = fila.telefono;
                        document.getElementById("status").value = fila.estatus;
                        
                        document.getElementById("corr").value = fila.email;
                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}



function BuscarCliente() {
    let ruta = "http://localhost:8080/SICEFA_web/api/persona/buscar";
    let v_buscar = document.getElementById("txtBuscar").value;

    if (v_buscar === "") {
        CargarTabla();
        return;
    }

    fetch(ruta + "?busqueda=" + v_buscar)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                const tablaCliente = document.getElementById("tblCliente").getElementsByTagName('tbody')[0];
                tablaCliente.innerHTML = "";

                data.forEach(function (fila) {
                    const nuevaFila = tablaCliente.insertRow(-1);

                    const idPersonaCell = nuevaFila.insertCell(0);
                    idPersonaCell.innerHTML = fila.idPersona;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const apellidoPCell = nuevaFila.insertCell(2);
                    apellidoPCell.innerHTML = fila.apellidoPaterno;

                    const apellidoMaternoCell = nuevaFila.insertCell(3);
                    apellidoMaternoCell.innerHTML = fila.apellidoMaterno;

                    const telefonoCell = nuevaFila.insertCell(4);
                    telefonoCell.innerHTML = fila.telefono;

                    const emailCell = nuevaFila.insertCell(5);
                    emailCell.innerHTML = fila.email;

                    const fechaRegistroCell = nuevaFila.insertCell(6);
                    fechaRegistroCell.innerHTML = fila.fechaRegistro;

                    const estatusCell = nuevaFila.insertCell(7);
                    estatusCell.innerHTML = fila.estatus;

                    const generoCell = fila.genero;

                    const fechaNacimientoCell = fila.fechaNacimiento;

                    const rfcCell = fila.rfc;

                    const domicilioCell = fila.domicilio;

                    const codigoPostalCell = fila.codigoPostal;

                    const ciudadCell = fila.ciudad;

                    const estadoCell = fila.estado;

                    nuevaFila.addEventListener("click", function () {
                        // Supongamos que 'fila' es un objeto con propiedades como 'nombre', 'apellidoP', 'apellidoM', 'edad', 'idPersona'
                        document.getElementById("txtIdPersona").value = fila.id;
                        document.getElementById("txtNombre").value = fila.nombre;
                        document.getElementById("txtApellidoP").value = fila.apellidoPaterno;
                        document.getElementById("txtApellidoM").value = fila.apellidoMaterno;
                        document.getElementById("genero").value = fila.genero;
                        document.getElementById("txtBirth").value = fila.fechaNacimiento;
                        document.getElementById("txtRFC").value = fila.rfc;
                        document.getElementById("txtCURP").value = fila.curp;
                        document.getElementById("direccion").value = fila.domicilio;
                        document.getElementById("CPostal").value = fila.codigoPostal;
                        document.getElementById("txtCiudad").value = fila.ciudad;
                        document.getElementById("txtEstado").value = fila.estado;
                        document.getElementById("tel").value = fila.telefono;
                        document.getElementById("status").value = fila.estatus;
                        document.getElementById("corr").value = fila.email;

                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}

function actualizarCliente() {
    let ruta = "http://localhost:8080/SICEFA_web/api/persona/update";
    
    let v_idPersona = document.getElementById("txtIdPersona").value;
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoP = document.getElementById("txtApellidoP").value;
    let v_apellidoM = document.getElementById("txtApellidoM").value;
    let v_genero = document.getElementById("genero").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_direccion = document.getElementById("direccion").value;
    let v_cod_postal = document.getElementById("CPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_fechaNacimiento = document.getElementById("txtBirth").value;
    let v_tel = document.getElementById("tel").value;
    let v_correo = document.getElementById("corr").value;

    var partes = v_fechaNacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    v_fechaNacimiento = nuevoFormato.join("/");


    let persona = {
        idPersona: v_idPersona,
        nombre: v_nombre,
        apellidoPaterno: v_apellidoP,
        apellidoMaterno: v_apellidoM,
        genero: v_genero,
        fechaNacimiento: v_fechaNacimiento,
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_direccion,
        codigoPostal: v_cod_postal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_tel,
        foto: ""

    };


    let cliente = {
        persona: persona,
        correo: v_correo

    };

    let params = {cliente: JSON.stringify(cliente)};

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                console.log(cliente);
                CargarTabla();
            });
    clean();
}

function eliminarCliente() {
    const ruta = "http://localhost:8080/SICEFA_web/api/persona/eliminarCliente";
    let v_id = document.getElementById("txtIdPersona").value;

    let cliente = {
        id: v_id
    };

    let params = {id: JSON.stringify(cliente)};

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
                CargarTabla();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}
