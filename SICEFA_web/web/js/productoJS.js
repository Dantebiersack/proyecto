function convertirImagen() {
    var input = document.getElementById('txtImg');
    var output = document.getElementById('txtFoto');
    var previewImage = document.getElementById('previewImage');

    var file = input.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var base64String = e.target.result.split(',')[1];
            output.value = base64String;
            previewImage.src = 'data:image/png;base64,' + base64String;
        };

        reader.readAsDataURL(file);
    }
}
function cargarImgDesdeBase64(){
    var foto = document.getElementById("txtFoto").value;
    document.getElementById("previewImage").src = 'data:image/png;base64,' + foto;
}

function insertarProducto() {
    let ruta = "http://localhost:8080/SICEFA_web/api/producto/insertProducto";

    let v_nombre = document.getElementById("txtNombre").value;
    let v_nombreGenerico = document.getElementById("txtNombreGenerico").value;
    let v_formaFarmaceutica = document.getElementById("txtFormaFarmaceutica").value;
    let v_unidadMedida = document.getElementById("txtUnidadMedida").value;
    let v_presentacion = document.getElementById("txtPresentacion").value;
    let v_principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;
    let v_contraindicaciones = document.getElementById("txtContraindicaciones").value;
    let v_concentracion = document.getElementById("txtConcentracion").value;
    let v_unidadesEnvase = document.getElementById("txtUnidadesEnvase").value;
    let v_precioCompra = document.getElementById("txtPrecioCompra").value;
    let v_precioVenta = document.getElementById("txtPrecioVenta").value;
    let v_foto = document.getElementById("txtFoto").value;
    let v_rutaFoto = document.getElementById("txtRutaFoto").value;
    let v_codigoBarras = document.getElementById("txtCodigoBarras").value;

    let producto = {
        nombre: v_nombre,
        nombreGenerico: v_nombreGenerico,
        formaFarmaceutica: v_formaFarmaceutica,
        unidadMedida: v_unidadMedida,
        presentacion: v_presentacion,
        principalIndicacion: v_principalIndicacion,
        contraindicaciones: v_contraindicaciones,
        concentracion: v_concentracion,
        unidadesEnvase: v_unidadesEnvase,
        precioCompra: v_precioCompra,
        precioVenta: v_precioVenta,
        foto: v_foto,
        rutaFoto: v_rutaFoto,
        codigoBarras: v_codigoBarras
    };

    let params = {datosProducto: JSON.stringify(producto)};

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(function (data) {
                return data.json();
            }).then(function (json)
    {
        console.log(json);
        CargarTabla();
        Swal.fire({
            title: "Listo",
            text: "Registro realizado",
            icon: "success"
        });
    }
    );
    vaciarFormulario();
}

function CargarTabla() {
    let ruta = "http://localhost:8080/SICEFA_web/api/producto/getAll";
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
                    idCell.innerHTML = fila.idProducto;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const nombreGenericoCell = nuevaFila.insertCell(2);
                    nombreGenericoCell.innerHTML = fila.nombreGenerico;

                    const formaFarmaceuticaCell = nuevaFila.insertCell(3);
                    formaFarmaceuticaCell.innerHTML = fila.formaFarmaceutica;


                    const unidadMedidaCell = nuevaFila.insertCell(4);
                    unidadMedidaCell.innerHTML = fila.unidadMedida;


                    const presentacionCell = nuevaFila.insertCell(5);
                    presentacionCell.innerHTML = fila.presentacion;

                    const principalIndicacionCell = nuevaFila.insertCell(6);
                    principalIndicacionCell.innerHTML = fila.principalIndicacion;


                    const contraindicacionesCell = nuevaFila.insertCell(7);
                    contraindicacionesCell.innerHTML = fila.contraindicaciones;


                    const concentracionCell = nuevaFila.insertCell(8);
                    concentracionCell.innerHTML = fila.concentracion;

                    const unidadesEnvaseCell = nuevaFila.insertCell(9);
                    unidadesEnvaseCell.innerHTML = fila.unidadesEnvase;

                    const precioCompraCell = nuevaFila.insertCell(10);
                    precioCompraCell.innerHTML = fila.precioCompra;

                    const precioVentaCell = nuevaFila.insertCell(11);
                    precioVentaCell.innerHTML = fila.precioVenta;

                    const fotoCell = nuevaFila.insertCell(12);
                    fotoCell.innerHTML = fila.foto;


                    const rutaFotoCell = nuevaFila.insertCell(13);
                    rutaFotoCell.innerHTML = fila.rutaFoto;


                    const codigoBarrasCell = nuevaFila.insertCell(14);
                    codigoBarrasCell.innerHTML = fila.codigoBarras;

                    const estatusCell = nuevaFila.insertCell(15);
                    estatusCell.innerHTML = fila.estatus;

                    // Asignar un evento clic a la fila para llenar los campos
                    nuevaFila.addEventListener("click", function () {
                        document.getElementById("txtIdProducto").value = fila.idProducto;
                        document.getElementById("txtNombre").value = fila.nombre;
                        document.getElementById("txtNombreGenerico").value = fila.nombreGenerico;
                        document.getElementById("txtFormaFarmaceutica").value = fila.formaFarmaceutica;
                        document.getElementById("txtUnidadMedida").value = fila.unidadMedida;
                        document.getElementById("txtPresentacion").value = fila.presentacion;
                        document.getElementById("txtPrincipalIndicacion").value = fila.principalIndicacion;
                        document.getElementById("txtContraindicaciones").value = fila.contraindicaciones;
                        document.getElementById("txtConcentracion").value = fila.concentracion;
                        document.getElementById("txtUnidadesEnvase").value = fila.unidadesEnvase;
                        document.getElementById("txtPrecioCompra").value = fila.precioCompra;
                        document.getElementById("txtPrecioVenta").value = fila.precioVenta;
                        document.getElementById("txtFoto").value = fila.foto;
                        document.getElementById("txtRutaFoto").value = fila.rutaFoto;
                        document.getElementById("txtCodigoBarras").value = fila.codigoBarras;
                        if (fila.estatus === 1) {
                            document.getElementById("txtEstatus").value = "Activo";
                        } else {
                            document.getElementById("txtEstatus").value = "Inactivo";
                        }
                        cargarImgDesdeBase64();
                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });

}

function actualizarProducto() {
    let ruta = "http://localhost:8080/SICEFA_web/api/producto/updateProducto";

    let v_nombre, v_nombreGenerico, v_formaFarmaceutica, v_unidadMedida,
            v_presentacion, v_principalIndicacion, v_contraindicaciones, v_concentracion, v_unidadesEnvase,
            v_precioCompra, v_precioVenta, v_foto, v_rutaFoto, v_codigoBarras;


    v_idProducto = document.getElementById("txtIdProducto").value;
    v_nombre = document.getElementById("txtNombre").value;
    v_nombreGenerico = document.getElementById("txtNombreGenerico").value;
    v_formaFarmaceutica = document.getElementById("txtFormaFarmaceutica").value;
    v_unidadMedida = document.getElementById("txtUnidadesEnvase").value;
    v_presentacion = document.getElementById("txtPresentacion").value;
    v_principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;
    v_contraindicaciones = document.getElementById("txtContraindicaciones").value;
    v_concentracion = document.getElementById("txtConcentracion").value;
    v_unidadesEnvase = document.getElementById("txtUnidadesEnvase").value;
    v_precioCompra = document.getElementById("txtPrecioCompra").value;
    v_precioVenta = document.getElementById("txtPrecioVenta").value;
    v_foto = document.getElementById("txtFoto").value;
    v_rutaFoto = document.getElementById("txtRutaFoto").value;
    v_codigoBarras = document.getElementById("txtCodigoBarras").value;

    let producto = {
        idProducto: v_idProducto,
        nombre: v_nombre,
        nombreGenerico: v_nombreGenerico,
        formaFarmaceutica: v_formaFarmaceutica,
        unidadMedida: v_unidadMedida,
        presentacion: v_presentacion,
        principalIndicacion: v_principalIndicacion,
        contraindicaciones: v_contraindicaciones,
        concentracion: v_concentracion,
        unidadesEnvase: v_unidadesEnvase,
        precioCompra: v_precioCompra,
        precioVenta: v_precioVenta,
        foto: v_foto,
        rutaFoto: v_rutaFoto,
        codigoBarras: v_codigoBarras
    };

    let params = {
        datosProducto: JSON.stringify(producto)
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
            }).then(function (json) {
        console.log(json);
        CargarTabla();
        Swal.fire({
            title: "Listo",
            text: "Registro Actualizado",
            icon: "success"
        });
    });
    vaciarFormulario();
}

function eliminarProducto() {
    let ruta = "http://localhost:8080/SICEFA_web/api/producto/eliminarProducto";

    let v_idProducto;


    v_idProducto = document.getElementById("txtIdProducto").value;

    let producto = {
        idProducto: v_idProducto
    };

    let params = {
        datosProducto: JSON.stringify(producto)
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
            }).then(function (json) {
        console.log(json);
        CargarTabla();
        Swal.fire({
            title: "Listo",
            text: "Estatus cambiado",
            icon: "success"
        });
    });
    vaciarFormulario();
}

function buscarProducto() {
    let ruta = "http://localhost:8080/SICEFA_web/api/producto/buscarProducto";
    let busqueda = document.getElementById("txtBusqueda").value.trim();
    if (busqueda === "") {
        CargarTabla();
        return;
    }

    //fetch(ruta+"?"+ new URLSearchParams(params), requestOptions)
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
                    idCell.innerHTML = fila.idProducto;

                    const nombreCell = nuevaFila.insertCell(1);
                    nombreCell.innerHTML = fila.nombre;

                    const nombreGenericoCell = nuevaFila.insertCell(2);
                    nombreGenericoCell.innerHTML = fila.nombreGenerico;

                    const formaFarmaceuticaCell = nuevaFila.insertCell(3);
                    formaFarmaceuticaCell.innerHTML = fila.formaFarmaceutica;

                    const unidadMedidaCell = nuevaFila.insertCell(4);
                    unidadMedidaCell.innerHTML = fila.unidadMedida;

                    const presentacionCell = nuevaFila.insertCell(5);
                    presentacionCell.innerHTML = fila.presentacion;

                    const principalIndicacionCell = nuevaFila.insertCell(6);
                    principalIndicacionCell.innerHTML = fila.principalIndicacion;

                    const contraindicacionesCell = nuevaFila.insertCell(7);
                    contraindicacionesCell.innerHTML = fila.contraindicaciones;

                    const concentracionCell = nuevaFila.insertCell(8);
                    concentracionCell.innerHTML = fila.concentracion;

                    const unidadesEnvaseCell = nuevaFila.insertCell(9);
                    unidadesEnvaseCell.innerHTML = fila.unidadesEnvase;

                    const precioCompraCell = nuevaFila.insertCell(10);
                    precioCompraCell.innerHTML = fila.precioCompra;

                    const precioVentaCell = nuevaFila.insertCell(11);
                    precioVentaCell.innerHTML = fila.precioVenta;

                    const fotoCell = nuevaFila.insertCell(12);
                    fotoCell.innerHTML = fila.foto;

                    const rutaFotoCell = nuevaFila.insertCell(13);
                    rutaFotoCell.innerHTML = fila.rutaFoto;

                    const codigoBarrasCell = nuevaFila.insertCell(14);
                    codigoBarrasCell.innerHTML = fila.codigoBarras;

                    const estatusCell = nuevaFila.insertCell(15);
                    estatusCell.innerHTML = fila.estatus;

                    // Asignar un evento clic a la fila para llenar los campos
                    nuevaFila.addEventListener("click", function () {
                        document.getElementById("txtIdProducto").value = fila.idProducto;
                        document.getElementById("txtNombre").value = fila.nombre;
                        document.getElementById("txtNombreGenerico").value = fila.nombreGenerico;
                        document.getElementById("txtFormaFarmaceutica").value = fila.formaFarmaceutica;
                        document.getElementById("txtUnidadMedida").value = fila.unidadMedida;
                        document.getElementById("txtPresentacion").value = fila.presentacion;
                        document.getElementById("txtPrincipalIndicacion").value = fila.principalIndicacion;
                        document.getElementById("txtContraindicaciones").value = fila.contraindicaciones;
                        document.getElementById("txtConcentracion").value = fila.concentracion;
                        document.getElementById("txtUnidadesEnvase").value = fila.unidadesEnvase;
                        document.getElementById("txtPrecioCompra").value = fila.precioCompra;
                        document.getElementById("txtPrecioVenta").value = fila.precioVenta;
                        document.getElementById("txtFoto").value = fila.foto;
                        document.getElementById("txtRutaFoto").value = fila.rutaFoto;
                        document.getElementById("txtCodigoBarras").value = fila.codigoBarras;
                        document.getElementById("txtEstatus").value = fila.estatus;
                    });
                });
            })
            .catch(function (error) {
                console.error("Error al cargar la tabla: " + error);
            });
}

function vaciarFormulario() {
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtNombreGenerico").value = "";
    document.getElementById("txtFormaFarmaceutica").value = "";
    document.getElementById("txtUnidadMedida").value = "";
    document.getElementById("txtPresentacion").value = "";
    document.getElementById("txtPrincipalIndicacion").value = "";
    document.getElementById("txtContraindicaciones").value = "";
    document.getElementById("txtConcentracion").value = "";
    document.getElementById("txtUnidadesEnvase").value = "";
    document.getElementById("txtPrecioCompra").value = "";
    document.getElementById("txtPrecioVenta").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("txtRutaFoto").value = "";
    document.getElementById("txtCodigoBarras").value = "";
    document.getElementById("txtEstatus").value = "";
    document.getElementById("txtImg").value = "";
    document.getElementById("previewImage").src = "";
}

document.getElementById('txtImg').addEventListener('change', function () {
    var input = this;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var base64String = e.target.result.split(',')[1];
            mostrarImagenPreview(base64String);
        };
        reader.readAsDataURL(input.files[0]);
    }
});

function mostrarImagenPreview(base64String) {
    var previewImage = document.getElementById('previewImage');
    previewImage.src = 'data:image/png;base64,' + base64String;
}

