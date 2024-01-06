-- ============================ Miguel ==================================
use sicefa;

drop procedure if exists sp_updateProducto;
delimiter $$
create procedure sp_updateProducto(
	in v_idProducto int,
	in v_nombre varchar(180), 
	in v_nombreGenerico varchar(200) ,
	in v_formaFarmaceutica varchar(100), 
	in v_unidadMedida varchar(25),
	in v_presentacion varchar(200), 
	in v_principalIndicacion varchar(255),
	in v_contraindicaciones varchar(255),
	in v_concentracion varchar(255),
	in v_unidadesEnvase int,
	in v_precioCompra float,
	in v_precioVenta float,
	in v_foto longtext,
	in v_rutaFoto varchar(254),
	in v_codigoBarras varchar(65)
)
begin
	update producto set  
    nombre = v_nombre, 
    nombreGenerico = v_nombreGenerico ,
    formaFarmaceutica = v_formaFarmaceutica,
    unidadMedida = v_unidadMedida,
    presentacion = v_presentacion,
    principalIndicacion = v_principalIndicacion,
    contraindicaciones = v_contraindicaciones,
    concentracion = v_concentracion,
    unidadesEnvase = v_unidadesEnvase,
    precioCompra = v_precioCompra,
    precioVenta = v_precioVenta,
    foto = v_foto,
    rutaFoto = v_rutaFoto,
    codigoBarras = v_codigoBarras 
    where idProducto = v_idProducto;
end $$
delimiter ;

drop procedure if exists sp_buscarProducto;
delimiter $$
create procedure sp_buscarProducto(in v_busqueda varchar(40))
begin
	if (v_busqueda = 'activo' or v_busqueda = 'Activo') then
		select * from producto where estatus = 1;
    elseif (v_busqueda = 'inactivo' or v_busqueda = 'Inactivo') then
		select * from producto where estatus = 0;
	else
        select	idProducto, nombre, nombreGenerico, formaFarmaceutica, unidadMedida, 
        presentacion, principalIndicacion, contraindicaciones, concentracion, 
        unidadesEnvase, precioCompra, precioVenta, foto, rutaFoto, codigoBarras, estatus 
		from producto
		where nombre like concat('%',v_busqueda,'%')
		OR nombreGenerico like concat('%',v_busqueda,'%')
		OR formaFarmaceutica LIKE CONCAT('%', v_busqueda, '%')
		OR unidadMedida LIKE CONCAT('%', v_busqueda, '%')
		OR presentacion LIKE CONCAT('%', v_busqueda, '%')
		OR principalIndicacion LIKE CONCAT('%', v_busqueda, '%')
		OR contraindicaciones LIKE CONCAT('%', v_busqueda, '%')
		OR concentracion LIKE CONCAT('%', v_busqueda, '%')
		OR unidadesEnvase LIKE CONCAT('%', v_busqueda, '%')
		OR precioCompra LIKE CONCAT('%', v_busqueda, '%')
		OR precioVenta LIKE CONCAT('%', v_busqueda, '%')
		OR codigoBarras LIKE CONCAT('%', v_busqueda, '%');
        end if;
end $$
delimiter ;

drop procedure if exists sp_cambiarEstatusProducto;
delimiter $$
create procedure sp_cambiarEstatusProducto(
in v_idProducto int

)
begin
if((select estatus from producto where idProducto = v_idProducto) = 1)then
	update producto set estatus = 0 where idProducto = v_idProducto;
    else 
    update producto set estatus = 1 where idProducto = v_idProducto;
    end if;
end $$
delimiter ;

-- ================================== Jimena ==============================
use sicefa;
drop procedure if exists sp_buscarSucursal;
delimiter $$
create procedure sp_buscarSucursal(in v_busqueda varchar(40))
begin
	if (v_busqueda = 'activo' or v_busqueda = 'Activo') then
		select * from producto where estatus = 1;
    elseif (v_busqueda = 'inactivo' or v_busqueda = 'Inactivo') then
		select * from sucursal where estatus = 0;
	else
        select	idSucursal, nombre, titular, rfc, domicilio, colonia, codigoPostal,
                      ciudad, estado, telefono, latitud, longitud, estatus
		from sucursal
		where nombre like concat('%',v_busqueda,'%')
		OR titular like concat('%',v_busqueda,'%')
		OR rfc LIKE CONCAT('%', v_busqueda, '%')
		OR domicilio LIKE CONCAT('%', v_busqueda, '%')
		OR colonia LIKE CONCAT('%', v_busqueda, '%')
		OR codigoPostal LIKE CONCAT('%', v_busqueda, '%')
		OR ciudad LIKE CONCAT('%', v_busqueda, '%')
		OR estado LIKE CONCAT('%', v_busqueda, '%')
		OR telefono LIKE CONCAT('%', v_busqueda, '%')
		OR latitud LIKE CONCAT('%', v_busqueda, '%')
		OR longitud LIKE CONCAT('%', v_busqueda, '%')
		OR estatus LIKE CONCAT('%', v_busqueda, '%');
        end if;
end $$
delimiter ;

drop procedure if exists sp_updateSucursal;
DELIMITER ##
CREATE PROCEDURE sp_updateSucursal
(
IN v_idSucursal INT,
IN v_nombre VARCHAR(49),
IN v_titular VARCHAR(49),
IN v_rfc VARCHAR(15),
IN v_domicilio VARCHAR(129),
IN v_colonia VARCHAR(65),
IN v_codigoPostal VARCHAR(11),
IN v_ciudad VARCHAR(65),
IN v_estado VARCHAR(49),
IN v_telefono VARCHAR(20),
IN v_latitud VARCHAR(65),
IN v_longitud VARCHAR(65)
)
BEGIN 
  UPDATE sucursal SET
    nombre = v_nombre,
    titular = v_titular,
    rfc = v_rfc,
    domicilio = v_domicilio,
    colonia = v_colonia,
    codigoPostal = v_codigoPostal,
    ciudad = v_ciudad,
    estado = v_estado,
    telefono = v_telefono,
    latitud = v_latitud,
    longitud = v_longitud
  WHERE idSucursal = v_idSucursal;
END ##
DELIMITER ;

-- ============================= Biron ====================================
DELIMITER ;
DROP PROCEDURE IF EXISTS insertarCliente; -- -------------------------------------------- INSERTAR CLIENTE
DELIMITER $$
CREATE PROCEDURE insertarCliente(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN var_foto 			longtext,		-- 13
                                    
                                    
                                  /* Datos del Cliente */  
                                    IN  var_email          VARCHAR(25),   -- 14
                                    
                                  
                                  /* Parametros de Salida */
                                    OUT var_idPersona       INT,          -- 15
                                    OUT var_idCliente      INT            -- 16
                                 )
    BEGIN
        -- Comenzamos insertando los datos de la Persona:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);
        
        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID(); 
        
        
        -- Insertamos los datos del Cliente:
        INSERT INTO cliente(email, fechaRegistro, estatus, idPersona)
                    VALUES(var_email, NOW(), 1, var_idPersona);
    END
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS eliminarCliente; -- -------------------------------------------------- ELIMINAR CLIENTE
DELIMITER $$
CREATE PROCEDURE eliminarCliente( IN var_idCliente int)
BEGIN
DECLARE var_idPersona int;
SELECT idPersona INTO var_idPersona FROM cliente WHERE var_idCliente  = idCliente;

UPDATE cliente
SET estatus = 0
WHERE idCliente = var_idCliente;
END
$$

DELIMITER ;

DROP PROCEDURE IF EXISTS modificarCliente;-- MODIFICAR CLIENTE
DELIMITER $$
CREATE PROCEDURE modificarCliente(
IN	var_nombre          VARCHAR(64),    --  1
IN	var_apellidoPaterno VARCHAR(64),    --  2
IN	var_apellidoMaterno VARCHAR(64),    --  3
IN  var_genero          VARCHAR(2),     --  4
IN  var_fechaNacimiento VARCHAR(20),    		--  5
IN  var_rfc             VARCHAR(14),    --  6
IN  var_curp            VARCHAR(19),    --  7
IN	var_domicilio       VARCHAR(129),   --  8
IN  var_codigoPostal   	VARCHAR(11),    --  9
IN  var_ciudad          VARCHAR(46),    -- 10
IN  var_estado          VARCHAR(40),    -- 11
IN	var_telefono        VARCHAR(20),    -- 12                                    
IN var_email VARCHAR(45),				-- 13
in var_idPersona int,					-- 14
in var_idCliente int					-- 15
)
BEGIN
/*MODIFICA PERSONA */
UPDATE persona 
SET nombre = var_nombre,
apellidoPaterno = var_apellidoPaterno,
apellidoMaterno = var_apellidoMaterno,
genero = var_genero,
fechaNacimiento = STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
rfc = var_rfc,
curp = var_curp,
domicilio = var_domicilio,
codigoPostal = var_codigoPostal,
ciudad = var_ciudad,
estado = var_estado,
telefono = var_telefono
WHERE idPersona = (SELECT idPersona FROM cliente WHERE idCliente = var_idPersona);

UPDATE cliente
SET email = var_email
WHERE idCliente = var_idCliente;
END
$$
DELIMITER ;

drop view if exists view_clientes;
CREATE VIEW view_clientes AS
SELECT
p.idPersona,
p.nombre,
p.apellidoPaterno,
p.apellidoMaterno,
p.genero,
p.fechaNacimiento,
p.rfc,
p.curp,
p.domicilio,
p.codigoPostal,
p.ciudad,
p.estado,
p.telefono,
  
  c.email,
  c.fechaRegistro,
  c.estatus
  
FROM persona p
JOIN cliente c ON p.idPersona = c.idCliente;

DROP PROCEDURE IF EXISTS buscarCliente;
DELIMITER $$
CREATE PROCEDURE buscarCliente(IN v_busqueda VARCHAR(40))
BEGIN
    IF (v_busqueda = 'activo' OR v_busqueda = 'Activo') THEN
        SELECT * FROM view_clientes WHERE activo = 1;
    ELSEIF (v_busqueda = 'inactivo' OR v_busqueda = 'Inactivo') THEN
        SELECT * FROM view_clientes WHERE activo = 0;
    ELSE
        SELECT 
			c.email,
			c.fechaRegistro,
			c.estatus,
            p.*
        FROM view_clientes c
        JOIN persona p ON c.idPersona = p.idPersona
        WHERE p.nombre LIKE CONCAT('%', v_busqueda, '%')
            OR p.apellidoPaterno LIKE CONCAT('%', v_busqueda, '%')
            OR p.apellidoMaterno LIKE CONCAT('%', v_busqueda, '%')
            OR p.genero LIKE CONCAT('%', v_busqueda, '%')
            OR p.fechaNacimiento LIKE CONCAT('%', v_busqueda, '%')
            OR p.rfc LIKE CONCAT('%', v_busqueda, '%')
            OR p.curp LIKE CONCAT('%', v_busqueda, '%')
            OR p.domicilio LIKE CONCAT('%', v_busqueda, '%')
            OR p.codigoPostal LIKE CONCAT('%', v_busqueda, '%')
            OR p.ciudad LIKE CONCAT('%', v_busqueda, '%')
            OR p.estado LIKE CONCAT('%', v_busqueda, '%')
            OR p.telefono LIKE CONCAT('%', v_busqueda, '%')
            OR c.email LIKE CONCAT('%', v_busqueda, '%')
            OR c.estatus LIKE CONCAT('%', v_busqueda, '%')
            OR c.fechaRegistro LIKE CONCAT('%', v_busqueda, '%');

    END IF;
END $$
DELIMITER ;
-- ================================== Oscar ==================================
-- Procedimiento almacenado para insertar un nuevo Empleado.
DROP PROCEDURE IF EXISTS insertarEmpleado;
DELIMITER $$
CREATE PROCEDURE insertarEmpleado(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del la Sucursal */
                                    IN  var_idSucursal      INT,            -- 14
                                    
                                  /* Datos del Usuario    */
                                    IN  var_rol             VARCHAR(10),    -- 15
                                    
                                  /* Datos del Empleado */  
                                    IN  var_puesto          VARCHAR(25),    -- 16
                                    IN  var_salarioBruto    FLOAT,          -- 17
                                  
                                  /* Parametros de Salida */
                                    OUT var_idPersona       INT,            -- 17
                                    OUT var_idUsuario       INT,            -- 18
                                    OUT var_idEmpleado      INT,            -- 19
                                    OUT var_codigoEmpleado  VARCHAR(9)      -- 20
                                 )
    BEGIN
        -- Comenzamos insertando los datos de la Persona:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);
        
        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID(); 
        
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_codigoEmpleado, var_codigoEmpleado, var_rol);
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID(); 
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), var_puesto, var_salarioBruto,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;

drop view if exists view_empleados;
CREATE VIEW view_empleados AS
SELECT
  p.idPersona,
  p.nombre,
  p.apellidoPaterno,
  p.apellidoMaterno,
  p.genero,
  p.fechaNacimiento,
  p.rfc,
  p.curp,
  p.domicilio,
  p.codigoPostal,
  p.ciudad,
  p.estado,
  p.telefono,
  p.foto,
  u.idUsuario,
  u.nombreUsuario,
  u.rol,	
  e.idEmpleado,
  e.codigo,
  e.fechaIngreso,
  e.puesto,
  e.salarioBruto,
  e.activo,
  e.idSucursal
FROM persona p
JOIN usuario u ON p.idPersona = u.idUsuario
JOIN empleado e ON p.idPersona = e.idPersona;

use sicefa;
DROP PROCEDURE IF EXISTS modificarEmpleado;
DELIMITER $$

CREATE PROCEDURE modificarEmpleado(
    IN  var_idEmpleado      INT,            --  1
    IN  var_nombre          VARCHAR(64),    --  2
    IN  var_apellidoPaterno VARCHAR(64),    --  3
    IN  var_apellidoMaterno VARCHAR(64),    --  4
    IN  var_genero          VARCHAR(2),     --  5
    IN  var_fechaNacimiento VARCHAR(11),    --  6
    IN  var_rfc             VARCHAR(14),    --  7
    IN  var_curp            VARCHAR(19),    --  8
    IN  var_domicilio       VARCHAR(129),   --  9
    IN  var_codigoPostal    VARCHAR(11),    -- 10
    IN  var_ciudad          VARCHAR(46),    -- 11
    IN  var_estado          VARCHAR(40),    -- 12
    IN  var_telefono        VARCHAR(20),    -- 13
    IN  var_foto            LONGTEXT,       -- 14
    IN  var_idSucursal      INT,            -- 15
    IN  var_rol             VARCHAR(10),    -- 16
    IN  var_puesto          VARCHAR(25),    -- 17
    IN  var_salarioBruto    FLOAT          -- 18

)
BEGIN
    DECLARE var_idPersona_empleado INT;

    -- Obtener el ID de Persona del Empleado
    SELECT idPersona INTO var_idPersona_empleado FROM empleado WHERE codigo = var_idEmpleado;

    -- MODIFICAR PERSONA
    UPDATE persona
    SET
        nombre = COALESCE(var_nombre, nombre),
        apellidoPaterno = COALESCE(var_apellidoPaterno, apellidoPaterno),
        apellidoMaterno = COALESCE(var_apellidoMaterno, apellidoMaterno),
        genero = COALESCE(var_genero, genero),
        fechaNacimiento = COALESCE(STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'), fechaNacimiento),
        rfc = COALESCE(var_rfc, rfc),
        curp = COALESCE(var_curp, curp),
        domicilio = COALESCE(var_domicilio, domicilio),
        codigoPostal = COALESCE(var_codigoPostal, codigoPostal),
        ciudad = COALESCE(var_ciudad, ciudad),
        estado = COALESCE(var_estado, estado),
        telefono = COALESCE(var_telefono, telefono),
        foto = COALESCE(var_foto, foto)
    WHERE idPersona = var_idPersona_empleado;

    -- MODIFICAR EMPLEADO
    UPDATE empleado
    SET
        fechaIngreso = NOW(), -- Puedes cambiar esto según tus necesidades
        puesto = COALESCE(var_puesto, puesto),
        salarioBruto = COALESCE(var_salarioBruto, salarioBruto),
        activo = activo -- Asumiendo que activo es un campo existente
    WHERE idEmpleado = var_idEmpleado;

    -- MODIFICAR USUARIO
    UPDATE usuario
    SET
        rol = COALESCE(var_rol, rol)
    WHERE idUsuario = (SELECT idUsuario FROM empleado WHERE idEmpleado = var_idEmpleado);

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS estatusEmpleado;
DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE estatusEmpleado(
    IN v_codigoEmpleado INT
)
BEGIN
    UPDATE empleado
    SET activo = CASE WHEN activo = 0 THEN 1 ELSE 0 END
    WHERE codigo = v_codigoEmpleado;
END$$
DELIMITER ;


use sicefa;
DROP PROCEDURE IF EXISTS buscarEmpleado;
DELIMITER $$
CREATE PROCEDURE buscarEmpleado(IN v_busqueda VARCHAR(40))
BEGIN
    IF (v_busqueda = 'activo' OR v_busqueda = 'Activo') THEN
        SELECT * FROM view_empleados WHERE activo = 1;
    ELSEIF (v_busqueda = 'inactivo' OR v_busqueda = 'Inactivo') THEN
        SELECT * FROM view_empleados WHERE activo = 0;
    ELSE
        SELECT 
            e.idEmpleado,
            e.codigo,
            e.fechaIngreso,
            e.puesto,
            e.salarioBruto,
            e.activo,
            e.idSucursal,
            u.*,
            p.*
        FROM view_empleados e
        JOIN persona p ON e.idPersona = p.idPersona
        JOIN usuario u ON e.idUsuario = u.idUsuario
        WHERE p.nombre LIKE CONCAT('%', v_busqueda, '%')
            OR p.apellidoPaterno LIKE CONCAT('%', v_busqueda, '%')
            OR p.apellidoMaterno LIKE CONCAT('%', v_busqueda, '%')
            OR p.genero LIKE CONCAT('%', v_busqueda, '%')
            OR p.fechaNacimiento LIKE CONCAT('%', v_busqueda, '%')
            OR p.rfc LIKE CONCAT('%', v_busqueda, '%')
            OR p.curp LIKE CONCAT('%', v_busqueda, '%')
            OR p.domicilio LIKE CONCAT('%', v_busqueda, '%')
            OR p.codigoPostal LIKE CONCAT('%', v_busqueda, '%')
            OR p.ciudad LIKE CONCAT('%', v_busqueda, '%')
            OR p.estado LIKE CONCAT('%', v_busqueda, '%')
            OR p.telefono LIKE CONCAT('%', v_busqueda, '%')
            OR e.codigo LIKE CONCAT('%', v_busqueda, '%')
            OR e.puesto LIKE CONCAT('%', v_busqueda, '%')
            OR e.salarioBruto LIKE CONCAT('%', v_busqueda, '%')
            OR u.nombreUsuario LIKE CONCAT('%', v_busqueda, '%');
    END IF;
END $$
DELIMITER ;
-- ================================== Luis ==================================
-- --DDL_FARMACIA----

CREATE TABLE proveedor 
(
  idProveedor     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email         VARCHAR(45) NOT NULL DEFAULT '',
  fechaRegistro date NOT NULL,
  estatus       INT NOT NULL DEFAULT 1, -- 0: Inactivo; 1: Activo
  idPersona     INT NOT NULL,
  CONSTRAINT fk_idpersona_proveedor
    FOREIGN KEY (idPersona)
    REFERENCES persona (idPersona)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE VIEW view_proveedor AS
SELECT
  p.idPersona,
  p.nombre,
  p.apellidoPaterno,
  p.apellidoMaterno, 
  p.telefono,
  pr.email,
  pr.fechaRegistro,  
  pr.estatus,
  p.genero,
  p.fechaNacimiento,
  p.rfc,
  p.curp,
  p.domicilio,
  p.codigoPostal,
  p.ciudad,
  p.estado
FROM persona p
JOIN proveedor pr ON p.idPersona = pr.idPersona;

-- view 2
CREATE VIEW view_proveedor2 AS
SELECT
  p.idPersona,
  pr.idProveedor,
  p.nombre,
  p.apellidoPaterno,
  p.apellidoMaterno, 
  p.telefono,
  pr.email,
  pr.fechaRegistro,  
  pr.estatus,
  p.genero,
  p.fechaNacimiento,
  p.rfc,
  p.curp,
  p.domicilio,
  p.codigoPostal,
  p.ciudad,
  p.estado
FROM persona p
JOIN proveedor pr ON p.idPersona = pr.idPersona;

--  --------------------------
-- PROCEDURES PROVEEDOR
-- ---------------------------

-- --------------------------
--  INSERTAR 
-- --------------------------
DROP PROCEDURE IF EXISTS insertarProveedor;
DELIMITER $$
CREATE PROCEDURE insertarProveedor(
    /* Datos Personales */
    IN var_nombre VARCHAR(64), -- 1
    IN var_apellidoPaterno VARCHAR(64), -- 2
    IN var_apellidoMaterno VARCHAR(64), -- 3
    IN var_genero VARCHAR(2), -- 4
    IN var_fechaNacimiento VARCHAR(11), -- 5
    IN var_rfc VARCHAR(14), -- 6
    IN var_curp VARCHAR(19), -- 7
    IN var_domicilio VARCHAR(129), -- 8
    IN var_codigoPostal VARCHAR(11), -- 9
    IN var_ciudad VARCHAR(46), -- 10
    IN var_estado VARCHAR(40), -- 11
    IN var_telefono VARCHAR(20), -- 12
    IN var_foto LONGTEXT, -- 13

    /* Datos del Proveedor */
    IN var_email VARCHAR(25), -- 14  
		

    /* Parametros de Salida */
    OUT var_idPersona INT,  -- 15
    OUT var_idProveedor INT  -- 16
    
    
)
BEGIN
    -- Comenzamos insertando los datos de la Persona:
    INSERT INTO persona (
        nombre, apellidoPaterno, apellidoMaterno, genero,
        fechaNacimiento, rfc, curp, domicilio, codigoPostal,
        ciudad, estado, telefono, foto
    )
    VALUES (
        var_nombre, var_apellidoPaterno, var_apellidoMaterno,
        var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
        var_rfc, var_curp, var_domicilio, var_codigoPostal,
        var_ciudad, var_estado, var_telefono, var_foto
    );
    
    SET var_idPersona = LAST_INSERT_ID();
        
    -- Insertamos los datos del Proveedor:
    INSERT INTO proveedor(email, fechaRegistro, estatus, idPersona)
    VALUES (var_email, CURDATE(), 1, var_idPersona);

   
END$$
DELIMITER ;

-- Llamada al procedimiento
CALL insertarProveedor(
    'Nombre',              -- 1
    'ApellidoPaterno',     -- 2
    'ApellidoMaterno',     -- 3
    'M',                   -- 4
    '01/01/2000',          -- 5
    'RFC1234567890',       -- 6
    'CURP12345678901234',  -- 7
    'Domicilio',           -- 8
    '12345',               -- 9
    'Ciudad',              -- 10
    'Estado',              -- 11
    '1234567890',          -- 12
    'Ruta/Foto.png',       -- 13
    'correo@example.com',  -- 14
    @var_idPersona,        -- 15
    @var_idProveedor        -- 16
);

-- ---------------------------
-- ELIMINAR
-- ---------------------------

DELIMITER ;
DROP PROCEDURE IF EXISTS eliminarProveedor;
DELIMITER $$
CREATE PROCEDURE eliminarProveedor( IN var_idPersona int)
BEGIN
DECLARE var_idProveedor int;
set var_idProveedor = (select idProveedor from proveedor where idPersona = var_idPersona);
if((select estatus from proveedor where idProveedor = var_idProveedor) = 1)then
	UPDATE proveedor SET estatus = 0 where idProveedor = var_idProveedor;
    else 
    UPDATE proveedor SET estatus = 1 where idProveedor = var_idProveedor;
    end if;
END$$

-- -------------------------
-- MODIFICAR
-- -------------------------

DROP PROCEDURE IF EXISTS modificarProveedor;
DELIMITER $$
CREATE PROCEDURE modificarProveedor(
IN	var_nombre          VARCHAR(64),    --  1
IN	var_apellidoPaterno VARCHAR(64),    --  2
IN	var_apellidoMaterno VARCHAR(64),    --  3
IN  var_genero          VARCHAR(2),     --  4
IN  var_fechaNacimiento VARCHAR(20),    --  5
IN  var_rfc             VARCHAR(14),    --  6
IN  var_curp            VARCHAR(19),    --  7
IN	var_domicilio       VARCHAR(129),   --  8
IN  var_codigoPostal   	VARCHAR(11),    --  9
IN  var_ciudad          VARCHAR(46),    -- 10
IN  var_estado          VARCHAR(40),    -- 11
IN	var_telefono        VARCHAR(20),    -- 12                                    
IN var_email 			VARCHAR(45),				-- 13
in var_idPersona 		int,					-- 14
in var_idProveedor 		int					-- 15
)
BEGIN
/*MODIFICA PERSONA */
UPDATE persona 
SET nombre = var_nombre,
apellidoPaterno = var_apellidoPaterno,
apellidoMaterno = var_apellidoMaterno,
genero = var_genero,
fechaNacimiento = STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
rfc = var_rfc,
curp = var_curp,
domicilio = var_domicilio,
codigoPostal = var_codigoPostal,
ciudad = var_ciudad,
estado = var_estado,
telefono = var_telefono
-- WHERE idPersona = (SELECT idPersona FROM proveedor WHERE idProveedor = var_idPersona);
WHERE idPersona = var_idPersona;
UPDATE proveedor
SET email = var_email
WHERE idProveedor = var_idProveedor;
END
$$
DELIMITER ;

-- -------------------------------------
--   BUSCAR
-- -------------------------------------
DROP PROCEDURE IF EXISTS buscarProveedor;
DELIMITER $$
CREATE PROCEDURE buscarProveedor(IN v_busqueda VARCHAR(40))
BEGIN
    IF (v_busqueda = 'activo' OR v_busqueda = 'Activo') THEN
        SELECT * FROM view_proveedor WHERE activo = 1;
    ELSEIF (v_busqueda = 'inactivo' OR v_busqueda = 'Inactivo') THEN
        SELECT * FROM view_proveedor WHERE activo = 0;
    ELSE
        SELECT 
			vp.email,
			vp.fechaRegistro,
			vp.estatus,
            p.*
        FROM  view_proveedor vp
        JOIN persona p ON vp.idPersona = p.idPersona
        WHERE p.nombre LIKE CONCAT('%', v_busqueda, '%')
            OR p.apellidoPaterno LIKE CONCAT('%', v_busqueda, '%')
            OR p.apellidoMaterno LIKE CONCAT('%', v_busqueda, '%')
            OR p.genero LIKE CONCAT('%', v_busqueda, '%')
            OR p.fechaNacimiento LIKE CONCAT('%', v_busqueda, '%')
            OR p.rfc LIKE CONCAT('%', v_busqueda, '%')
            OR p.curp LIKE CONCAT('%', v_busqueda, '%')
            OR p.domicilio LIKE CONCAT('%', v_busqueda, '%')
            OR p.codigoPostal LIKE CONCAT('%', v_busqueda, '%')
            OR p.ciudad LIKE CONCAT('%', v_busqueda, '%')
            OR p.estado LIKE CONCAT('%', v_busqueda, '%')
            OR p.telefono LIKE CONCAT('%', v_busqueda, '%')
            OR vp.email LIKE CONCAT('%', v_busqueda, '%')
            OR vp.estatus LIKE CONCAT('%', v_busqueda, '%')
            OR vp.fechaRegistro LIKE CONCAT('%', v_busqueda, '%');

    END IF;
END $$
DELIMITER ;