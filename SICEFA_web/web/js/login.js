function loginVendedor() {
    var usuario = document.getElementById('txtUsuario').value;
    var contraseña = document.getElementById('txtPassword').value;

    if (usuario === 'vendedor' && contraseña === 'vendedor') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto',
            showConfirmButton: false,
            timer: 1000
        }).then(function () {
            window.location.href = '../modulos/vendedor/homeVendedor.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            text: 'Inténtalo de nuevo'
        });
    }
}

function loginSucursal() {
    var usuario = document.getElementById('txtUsuario').value;
    var contraseña = document.getElementById('txtPassword').value;

    if (usuario === 'vendedor' && contraseña === 'vendedor') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto',
            showConfirmButton: false,
            timer: 1000
        }).then(function () {
            window.location.href = '../modulos/administrador/homeAdminSucursal.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            text: 'Inténtalo de nuevo'
        });
    }
}

function loginCentral() {
    var usuario = document.getElementById('txtUsuario').value;
    var contraseña = document.getElementById('txtPassword').value;

    if (usuario === 'vendedor' && contraseña === 'vendedor') {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto',
            showConfirmButton: false,
            timer: 1000
        }).then(function () {
            window.location.href = '../modulos/administrador/homeAdminCentral.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            text: 'Inténtalo de nuevo'
        });
    }
}



