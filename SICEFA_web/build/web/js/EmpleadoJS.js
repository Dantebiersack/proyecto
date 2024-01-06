
function insertarEmpleado() {
    const ruta = "http://localhost:8080/SICEFA_web/api/empleado/insertarEmpleado";
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    let v_genero = document.getElementById("txtGenero").value;
    let v_fecha_nacimiento = document.getElementById("dateBirth").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_direccion = document.getElementById("txtDireccion").value;
    let v_codigoPostal = document.getElementById("txtCodigoPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_foto = document.getElementById("txtFoto").value;
    let v_sucursal = document.getElementById("txtSucursal").value;
    let v_rol = document.getElementById("txtRol").value;
    let v_puesto = document.getElementById("txtPuesto").value;
    let v_salario = document.getElementById("txtSalario").value;

    var partes = v_fecha_nacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    v_fecha_nacimiento = nuevoFormato.join("/");

    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: v_genero,
        fechaNacimiento: v_fecha_nacimiento, // Cambiar el nombre del atributo
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_direccion, // Cambiar el nombre del atributo
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono,
        foto: v_foto
    };

    let empleado =
            {
                puesto: v_puesto,
                salarioBruto: v_salario, // Cambiar el nombre del atributo
                idSucursal: v_sucursal
            };

    let rolUsuario =
            {
                rol: v_rol
            };

    empleado.persona = persona;
    empleado.rolUsuario = rolUsuario;

    let params = {datosEmpleado: JSON.stringify(empleado)};

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

function CargarTabla() {
    let ruta = "http://localhost:8080/SICEFA_web/api/empleado/getall";
    fetch(ruta)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                const tablaRegistros = document.getElementById("tblEmpleados").getElementsByTagName('tbody')[0];
                tablaRegistros.innerHTML = "";

                data.forEach(function (fila) {
                    const nuevaFila = tablaRegistros.insertRow(-1);
                    //nuevaFila.classList.add("visually-hidden");

                    const idCell = nuevaFila.insertCell(0);
                    idCell.innerHTML = fila.idEmpleado;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const apellidoPCell = nuevaFila.insertCell(2);
                    apellidoPCell.innerHTML = fila.apellidoPaterno;

                    const apellidoMCell = nuevaFila.insertCell(3);
                    apellidoMCell.innerHTML = fila.apellidoMaterno;

                    const generoCell = nuevaFila.insertCell(4);
                    generoCell.innerHTML = fila.genero;

                    const fechaNacimientoCell = nuevaFila.insertCell(5);
                    fechaNacimientoCell.innerHTML = fila.fechaNacimiento;

                    const rfcCell = nuevaFila.insertCell(6);
                    rfcCell.innerHTML = fila.rfc;

                    const curpCell = nuevaFila.insertCell(7);
                    curpCell.innerHTML = fila.curp;

                    const direccionCell = nuevaFila.insertCell(8);
                    direccionCell.innerHTML = fila.domicilio;

                    const codigoPostalCell = nuevaFila.insertCell(9);
                    codigoPostalCell.innerHTML = fila.codigoPostal;

                    const ciudadCell = nuevaFila.insertCell(10);
                    ciudadCell.innerHTML = fila.ciudad;

                    const estadoCell = nuevaFila.insertCell(11);
                    estadoCell.innerHTML = fila.estado;

                    const telefonoCell = nuevaFila.insertCell(12);
                    telefonoCell.innerHTML = fila.telefono;

                    const fotoCell = nuevaFila.insertCell(13);
                    fotoCell.innerHTML = fila.foto;

                    const idSucursalCell = nuevaFila.insertCell(14);
                    idSucursalCell.innerHTML = fila.idSucursal;

                    const rolUsuarioCell = nuevaFila.insertCell(15);
                    rolUsuarioCell.innerHTML = fila.rol;

                    const puestoCell = nuevaFila.insertCell(16);
                    puestoCell.innerHTML = fila.puesto;

                    const salarioBrutoCell = nuevaFila.insertCell(17);
                    salarioBrutoCell.innerHTML = fila.salarioBruto;

                    const activoCell = nuevaFila.insertCell(18);
                    activoCell.innerHTML = fila.activo;

                    const codigoCell = nuevaFila.insertCell(19);
                    codigoCell.innerHTML = fila.codigo;

                    nuevaFila.addEventListener("click", function () {

                        document.getElementById("txtCodigo").value = fila.codigo;
                        document.getElementById("txtNombre").value = fila.nombre;
                        document.getElementById("txtApellidoPaterno").value = fila.apellidoPaterno;
                        document.getElementById("txtApellidoMaterno").value = fila.apellidoMaterno;
                        document.getElementById("txtGenero").value = fila.genero;
                        document.getElementById("dateBirth").value = fila.fechaNacimiento;
                        document.getElementById("txtRFC").value = fila.rfc;
                        document.getElementById("txtCURP").value = fila.curp;
                        document.getElementById("txtDireccion").value = fila.domicilio;
                        document.getElementById("txtCodigoPostal").value = fila.codigoPostal;
                        document.getElementById("txtCiudad").value = fila.ciudad;
                        document.getElementById("txtEstado").value = fila.estado;
                        document.getElementById("txtTelefono").value = fila.telefono;
                        document.getElementById("txtFoto").value = fila.foto;
                        document.getElementById("txtSucursal").value = fila.idSucursal;
                        document.getElementById("txtRol").value = fila.rol;
                        document.getElementById("txtPuesto").value = fila.puesto;
                        document.getElementById("txtSalario").value = fila.salarioBruto;
                        //document.getElementById("txtId").value = fila.idPersona;

                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}

function actualizar() {
    let ruta = "http://localhost:8080/SICEFA_web/api/empleado/update";

    let v_codigo = document.getElementById("txtCodigo").value;
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    let v_genero = document.getElementById("txtGenero").value;
    let v_fecha_nacimiento = document.getElementById("dateBirth").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_direccion = document.getElementById("txtDireccion").value;
    let v_codigoPostal = document.getElementById("txtCodigoPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_foto = document.getElementById("txtFoto").value;
    let v_sucursal = document.getElementById("txtSucursal").value;
    let v_rol = document.getElementById("txtRol").value;
    let v_puesto = document.getElementById("txtPuesto").value;
    let v_salario = document.getElementById("txtSalario").value;

    var partes = v_fecha_nacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    v_fecha_nacimiento = nuevoFormato.join("/");

    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: v_genero,
        fechaNacimiento: v_fecha_nacimiento, // Cambiar el nombre del atributo
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_direccion, // Cambiar el nombre del atributo
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono,
        foto: v_foto
    };

    let empleado =
            {
                idEmpleado: v_codigo,
                puesto: v_puesto,
                salarioBruto: v_salario, // Cambiar el nombre del atributo
                idSucursal: v_sucursal
            };

    let rolUsuario =
            {
                rol: v_rol // Agregar el atributo rol
            };

    empleado.persona = persona; // Asignar el objeto persona al atributo persona del objeto empleado
    empleado.rolUsuario = rolUsuario; // Asignar el objeto rolUsuario al atributo rolUsuario del objeto empleado

    let params = {datosEmpleado: JSON.stringify(empleado)};

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

function borrarEmpleado() {
    const ruta = "http://localhost:8080/SICEFA_web/api/empleado/eliminarEmpleado";
    let v_codigo = document.getElementById("txtCodigo").value;

    let empleado = {
        codigo: v_codigo
    };

    let params = {codigo: JSON.stringify(empleado)};

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

function BuscarEmpleado() {
    let ruta = "http://localhost:8080/SICEFA_web/api/empleado/buscar";
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
                const tablaRegistros = document.getElementById("tblEmpleados").getElementsByTagName('tbody')[0];
                tablaRegistros.innerHTML = "";

                data.forEach(function (fila) {
                    const nuevaFila = tablaRegistros.insertRow(-1);
                    //nuevaFila.classList.add("visually-hidden");

                    const idCell = nuevaFila.insertCell(0);
                    idCell.innerHTML = fila.idEmpleado;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const apellidoPCell = nuevaFila.insertCell(2);
                    apellidoPCell.innerHTML = fila.apellidoPaterno;

                    const apellidoMCell = nuevaFila.insertCell(3);
                    apellidoMCell.innerHTML = fila.apellidoMaterno;

                    const generoCell = nuevaFila.insertCell(4);
                    generoCell.innerHTML = fila.genero;

                    const fechaNacimientoCell = nuevaFila.insertCell(5);
                    fechaNacimientoCell.innerHTML = fila.fechaNacimiento;

                    const rfcCell = nuevaFila.insertCell(6);
                    rfcCell.innerHTML = fila.rfc;

                    const curpCell = nuevaFila.insertCell(7);
                    curpCell.innerHTML = fila.curp;

                    const direccionCell = nuevaFila.insertCell(8);
                    direccionCell.innerHTML = fila.domicilio;

                    const codigoPostalCell = nuevaFila.insertCell(9);
                    codigoPostalCell.innerHTML = fila.codigoPostal;

                    const ciudadCell = nuevaFila.insertCell(10);
                    ciudadCell.innerHTML = fila.ciudad;

                    const estadoCell = nuevaFila.insertCell(11);
                    estadoCell.innerHTML = fila.estado;

                    const telefonoCell = nuevaFila.insertCell(12);
                    telefonoCell.innerHTML = fila.telefono;

                    const fotoCell = nuevaFila.insertCell(13);
                    fotoCell.innerHTML = fila.foto;

                    const idSucursalCell = nuevaFila.insertCell(14);
                    idSucursalCell.innerHTML = fila.idSucursal;

                    const rolUsuarioCell = nuevaFila.insertCell(15);
                    rolUsuarioCell.innerHTML = fila.rol;

                    const puestoCell = nuevaFila.insertCell(16);
                    puestoCell.innerHTML = fila.puesto;

                    const salarioBrutoCell = nuevaFila.insertCell(17);
                    salarioBrutoCell.innerHTML = fila.salarioBruto;

                    const activoCell = nuevaFila.insertCell(18);
                    activoCell.innerHTML = fila.activo;

                    const codigoCell = nuevaFila.insertCell(19);
                    codigoCell.innerHTML = fila.codigo;

                    nuevaFila.addEventListener("click", function () {
                        // Supongamos que 'fila' es un objeto con propiedades como 'nombre', 'apellidoP', 'apellidoM', 'edad', 'idPersona'
                        document.getElementById("txtCodigo").value = fila.codigo;
                        document.getElementById("txtNombre").value = fila.nombre;
                        document.getElementById("txtApellidoPaterno").value = fila.apellidoPaterno;
                        document.getElementById("txtApellidoMaterno").value = fila.apellidoMaterno;
                        document.getElementById("txtGenero").value = fila.genero;
                        document.getElementById("dateBirth").value = fila.fechaNacimiento;
                        document.getElementById("txtRFC").value = fila.rfc;
                        document.getElementById("txtCURP").value = fila.curp;
                        document.getElementById("txtDireccion").value = fila.domicilio;
                        document.getElementById("txtCodigoPostal").value = fila.codigoPostal;
                        document.getElementById("txtCiudad").value = fila.ciudad;
                        document.getElementById("txtEstado").value = fila.estado;
                        document.getElementById("txtTelefono").value = fila.telefono;
                        document.getElementById("txtFoto").value = fila.foto;
                        document.getElementById("txtSucursal").value = fila.idSucursal;
                        document.getElementById("txtRol").value = fila.rol;
                        document.getElementById("txtPuesto").value = fila.puesto;
                        document.getElementById("txtSalario").value = fila.salarioBruto;
                        //document.getElementById("txtId").value = fila.idPersona;

                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}