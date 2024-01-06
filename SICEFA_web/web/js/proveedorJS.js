function insertar() {
    
    let ruta = "http://localhost:8080/SICEFA_web/api/proveedor/insertarProveedor";
    
    let var_nombre = document.getElementById("txtNombre").value;
    let var_apellidoPaterno = document.getElementById("txtApellidoP").value;
    let var_apellidoMaterno = document.getElementById("txtApellidoM").value;
    let var_genero = document.getElementById("txtGenero").value;
    let var_fechaNacimiento = document.getElementById("txtCumple").value;
    let var_rfc = document.getElementById("txtRFC").value;
    let var_curp = document.getElementById("txtCURP").value;
    let var_domicilio = document.getElementById("txtDireccion").value;
    let var_codigoPostal = document.getElementById("txtCP").value;
    let var_ciudad = document.getElementById("txtCiudad").value;
    let var_estado = document.getElementById("txtEstado").value;
    let var_telefono = document.getElementById("txtTelefono").value;
    let var_foto = document.getElementById("archivo").value;
    let var_email = document.getElementById("txtEmail").value;    
   

    
    // Formatear la fecha directamente al formato esperado por MySQL
    var partes = var_fechaNacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    var_fechaNacimiento = nuevoFormato.join("/"); // Formato "yyyy-mm-dd"
             
    let persona = {        
        nombre: var_nombre,
        apellidoPaterno: var_apellidoPaterno,
        apellidoMaterno: var_apellidoMaterno,
        genero: var_genero,
        fechaNacimiento: var_fechaNacimiento,
        rfc: var_rfc,
        curp: var_curp,
        domicilio: var_domicilio,
        codigoPostal: var_codigoPostal,
        ciudad: var_ciudad,
        estado: var_estado,
        telefono: var_telefono,        
        foto: var_foto    
    };
    
    let proveedor = {        
        email: var_email,        
        estatus : 1,
        persona : persona
    };
    
   
      
      let params = {datosProveedor: JSON.stringify(proveedor)};
        console.log(params);
    
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
                console.log(proveedor);
                cargarTabla();           
                                 
            }
            );
    
    
    }

  
function modificar() {
    let ruta = "http://localhost:8080/SICEFA_web/api/proveedor/update";
    
    let var_idPersona = document.getElementById("txtCodigo").value;
    let var_nombre = document.getElementById("txtNombre").value;
    let var_apellidoPaterno = document.getElementById("txtApellidoP").value;
    let var_apellidoMaterno = document.getElementById("txtApellidoM").value;
    let var_genero = document.getElementById("txtGenero").value;
    let var_fechaNacimiento = document.getElementById("txtCumple").value;
    let var_rfc = document.getElementById("txtRFC").value;
    let var_curp = document.getElementById("txtCURP").value;
    let var_domicilio = document.getElementById("txtDireccion").value;
    let var_codigoPostal = document.getElementById("txtCP").value;
    let var_ciudad = document.getElementById("txtCiudad").value;
    let var_estado = document.getElementById("txtEstado").value;
    let var_telefono = document.getElementById("txtTelefono").value;
    let var_foto = document.getElementById("archivo").value;
    let var_email = document.getElementById("txtEmail").value;    
    
    
       
    var partes = var_fechaNacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    var_fechaNacimiento = nuevoFormato.join("/");
    

    
     let persona = {
        idPersona: var_idPersona,
        nombre: var_nombre,
        apellidoPaterno: var_apellidoPaterno,
        apellidoMaterno: var_apellidoMaterno,
        genero: var_genero,
        fechaNacimiento: var_fechaNacimiento,
        rfc: var_rfc,
        curp: var_curp,
        domicilio: var_domicilio,
        codigoPostal: var_codigoPostal,
        ciudad: var_ciudad,
        estado: var_estado,
        telefono: var_telefono,        
        foto: var_foto    
    };
    
    let proveedor = {        
        email: var_email,                
        persona : persona
    };
              
         

    
    let params = {datosProveedor: JSON.stringify(proveedor)
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: new URLSearchParams(params)
    };
    
    fetch(ruta, requestOptions)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                console.log(proveedor);
                cargarTabla();

            });
            limpiar();
}
   
  
  function eliminar() {
    let ruta = "http://localhost:8080/SICEFA_web/api/proveedor/eliminarProveedor";
    let var_idProveedor = document.getElementById("txtCodigo").value;

    let proveedor = {        
        idProveedor : var_idProveedor
    };

    let params = {idProveedor: JSON.stringify(proveedor)};

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
                limpiar();
                cargarTabla();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
        }


function limpiar() {
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoP").value = "";
    document.getElementById("txtApellidoM").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtCumple").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtCURP").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtEmail").value = "";    
    document.getElementById("archivo").value = "";           
    document.getElementById("txtNombre").focus();
    
    cargarTabla();
 }     
    
function cargarTabla() {
    let ruta = "http://localhost:8080/SICEFA_web/api/proveedor/getall";
    fetch(ruta)
        .then(function (data) {
            console.log(data);
            return data.json();
        })
        .then(function (data) {
            // Obtener la tabla y su cuerpo
            const tablaCliente = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];

            // Limpiar la tabla
            tablaCliente.innerHTML = "";

            // Recorrer los datos y agregar filas a la tabla
            data.forEach(function (fila) {
                const nuevaFila = tablaCliente.insertRow(-1);

                const idPersonaCell = nuevaFila.insertCell(0);
                idPersonaCell.innerHTML = fila.idPersona;

                const nombreCell = nuevaFila.insertCell(1);
                nombreCell.innerHTML = fila.nombre;

                const apellidoPaternoCell = nuevaFila.insertCell(2);
                apellidoPaternoCell.innerHTML = fila.apellidoPaterno;

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
                    
                    const curpCell = fila.curp;
                    
                    const rfcCell = fila.rfc;

                    const domicilioCell = fila.domicilio;

                    const codigoPostalCell = fila.codigoPostal;

                    const ciudadCell = fila.ciudad;
                                      
                    
                    const estadoCell = fila.estado;

                // Asignar un evento clic a la fila para llenar los campos
                nuevaFila.addEventListener("click", function () {
                    document.getElementById("txtCodigo").value = fila.idPersona;
                    document.getElementById("txtNombre").value = fila.nombre;
                    document.getElementById("txtApellidoP").value = fila.apellidoPaterno;
                    document.getElementById("txtApellidoM").value = fila.apellidoMaterno;
                    document.getElementById("txtGenero").value = fila.genero;
                    document.getElementById("txtCumple").value = fila.fechaNacimiento;
                    document.getElementById("txtRFC").value = fila.rfc;
                    document.getElementById("txtCURP").value = fila.curp;
                    document.getElementById("txtDireccion").value = fila.domicilio;
                    document.getElementById("txtCP").value = fila.codigoPostal;
                    document.getElementById("txtCiudad").value = fila.ciudad;
                    document.getElementById("txtEstado").value = fila.estado;
                    document.getElementById("txtTelefono").value = fila.telefono;
                    document.getElementById("txtEmail").value = fila.email;
                    
                });
            });
        })
        .catch(function (error) {
            console.error("Error al cargar la tabla: " + error);
        });
}


        
        
 function BuscarProveedor() {
    let ruta = "http://localhost:8080/SICEFA_web/api/proveedor/buscar";
    let v_buscar = document.getElementById("buscarProveedor").value;

    if (v_buscar === "") {
        cargarTabla();
        return;
    }

    fetch(ruta + "?busqueda=" + v_buscar)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                const tablaCliente = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];
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
                        document.getElementById("txtCodigo").value = fila.idPersona;
                    document.getElementById("txtNombre").value = fila.nombre;
                    document.getElementById("txtApellidoP").value = fila.apellidoPaterno;
                    document.getElementById("txtApellidoM").value = fila.apellidoMaterno;
                    document.getElementById("txtGenero").value = fila.genero;
                    document.getElementById("txtCumple").value = fila.fechaNacimiento;
                    document.getElementById("txtRFC").value = fila.rfc;
                    document.getElementById("txtCURP").value = fila.curp;
                    document.getElementById("txtDireccion").value = fila.domicilio;
                    document.getElementById("txtCP").value = fila.codigoPostal;
                    document.getElementById("txtCiudad").value = fila.ciudad;
                    document.getElementById("txtEstado").value = fila.estado;
                    document.getElementById("txtTelefono").value = fila.telefono;
                    document.getElementById("txtEmail").value = fila.email;

                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}