package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.model.DatosEmpleado;
import org.utl.dsm.model.Empleado;
import org.utl.dsm.model.Persona;
import org.utl.dsm.model.Usuario;

public class ControllerEmpleado {

    public Empleado insertEmpleado(Empleado empleado) {
        String query = "{CALL insertarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = (Connection) connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setString(1, empleado.getPersona().getNombre());
            cstm.setString(2, empleado.getPersona().getApellidoPaterno());
            cstm.setString(3, empleado.getPersona().getApellidoMaterno());
            cstm.setString(4, empleado.getPersona().getGenero());
            cstm.setString(5, empleado.getPersona().getFechaNacimiento());
            cstm.setString(6, empleado.getPersona().getRfc());
            cstm.setString(7, empleado.getPersona().getCurp());
            cstm.setString(8, empleado.getPersona().getDomicilio());
            cstm.setString(9, empleado.getPersona().getCodigoPostal());
            cstm.setString(10, empleado.getPersona().getCiudad());
            cstm.setString(11, empleado.getPersona().getEstado());
            cstm.setString(12, empleado.getPersona().getTelefono());
            cstm.setString(13, empleado.getPersona().getFoto());
            //Datos Sucursal
            cstm.setInt(14, empleado.getIdSucursal());
            //Datos Usuario
            cstm.setString(15, empleado.getRolUsuario().getRol());
            //Datos Empleado
            cstm.setString(16, empleado.getPuesto());
            cstm.setFloat(17, empleado.getSalarioBruto());
            //Registrar los parámetros de salida
            cstm.registerOutParameter(18, java.sql.Types.INTEGER); // var_idPersona
            cstm.registerOutParameter(19, java.sql.Types.INTEGER); // var_idUsuario
            cstm.registerOutParameter(20, java.sql.Types.INTEGER); // var_idEmpleado
            cstm.registerOutParameter(21, java.sql.Types.INTEGER); // var_codigoEmpleado
            //Ejecutar el procedimiento
            cstm.execute();
            //Obtener los valores de los parámetros de salida
            empleado.getPersona().setIdPersona(cstm.getInt(18));
            empleado.getRolUsuario().setIdUsuario(cstm.getInt(19));
            empleado.setIdEmpleado(cstm.getInt(20));
            empleado.setCodigo(cstm.getString(21));
            //Cerrar los recursos
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return empleado;
    }

    public List<DatosEmpleado> getAll() {
        //Se crea una lista llamada personas que almacenará objetos de tipo Persona.
        List<DatosEmpleado> dempleados = new ArrayList<>();
        // Se define una consulta SQL que selecciona todos los registros de la tabla "persona".
        String query = "SELECT * FROM view_empleados";

        // Se establece una conexión con la base de datos.
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            // Se recorren los resultados y se crea un objeto Persona para cada registro.
            while (rs.next()) {

                Empleado emp = new Empleado();
                Persona p = new Persona();
                Usuario u = new Usuario();

                int idPersona = rs.getInt("idPersona");
                String nombre = rs.getString("nombre");
                String apellidoPaterno = rs.getString("apellidoPaterno");
                String apellidoMaterno = rs.getString("apellidoMaterno");
                String genero = rs.getString("genero");
                String fechaNacimiento = rs.getString("fechaNacimiento");
                String rfc = rs.getString("rfc");
                String curp = rs.getString("curp");
                String domicilio = rs.getString("domicilio");
                String codigoPostal = rs.getString("codigoPostal");
                String ciudad = rs.getString("ciudad");
                String estado = rs.getString("estado");
                String telefono = rs.getString("telefono");
                String foto = rs.getString("foto");
                int idUsuario = rs.getInt("idUsuario");
                String nombreUsuario = rs.getString("nombreUsuario");
                String rol = rs.getString("rol");
                int idEmpleado = rs.getInt("idEmpleado");
                String codigo = rs.getString("codigo");
                String fechaIngreso = rs.getString("fechaIngreso");
                String puesto = rs.getString("puesto");
                float salarioBruto = rs.getFloat("salarioBruto");
                int activo = rs.getInt("activo");
                int idSucursal = rs.getInt("idSucursal");

                // Cada objeto Persona se agrega a la lista personas.
                Persona persona = new Persona(idPersona, nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, foto, domicilio, codigoPostal, ciudad, estado, telefono);
                Usuario rolUsuario = new Usuario(idUsuario, nombreUsuario, nombre, rol);
                Empleado empleado = new Empleado(idEmpleado, codigo, fechaIngreso, puesto, salarioBruto, activo, persona, rolUsuario, idSucursal);
                DatosEmpleado dempleado = new DatosEmpleado(idPersona, nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto, idUsuario, nombreUsuario, nombre, rol, idEmpleado, codigo, fechaIngreso, puesto, salarioBruto, activo, persona, rolUsuario, idSucursal);
                dempleados.add(dempleado);

                System.out.println(dempleados);
            }
            // Se cierran los recursos de la base de datos
            rs.close();
            pstm.close();
            connMysql.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Finalmente, se devuelve la lista personas que contiene todos los registros de la tabla "persona".
        return dempleados;
    }

    public void updateEmpleado(DatosEmpleado empleado) throws SQLException {
        System.out.println("llegamos al controller");
        System.out.println("Nombre:" + empleado.getPersona().getNombre());
        String query = "{CALL modificarEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();
        CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
        cstm.setInt(1, empleado.getIdEmpleado());
        cstm.setString(2, empleado.getPersona().getNombre());
        cstm.setString(3, empleado.getPersona().getApellidoPaterno());
        cstm.setString(4, empleado.getPersona().getApellidoMaterno());
        cstm.setString(5, empleado.getPersona().getGenero());
        cstm.setString(6, empleado.getPersona().getFechaNacimiento());
        cstm.setString(7, empleado.getPersona().getRfc());
        cstm.setString(8, empleado.getPersona().getCurp());
        cstm.setString(9, empleado.getPersona().getDomicilio());
        cstm.setString(10, empleado.getPersona().getCodigoPostal());
        cstm.setString(11, empleado.getPersona().getCiudad());
        cstm.setString(12, empleado.getPersona().getEstado());
        cstm.setString(13, empleado.getPersona().getTelefono());
        cstm.setString(14, empleado.getPersona().getFoto());
        //Datos Sucursal
        cstm.setInt(15, empleado.getIdSucursal());
        //Datos Usuario
        cstm.setString(16, empleado.getRolUsuario().getRol());
        //Datos Empleado
        cstm.setString(17, empleado.getPuesto());
        cstm.setFloat(18, empleado.getSalarioBruto());

        // ejecutamos el PreparedStatement
        cstm.execute();
        //Cerramos todos nuestros objetos de conexión con el servidor
        cstm.close();
        connMysql.close();
        conn.close();

    }
    
  public Empleado eliminarEmpleado(Empleado empleado) {
        String query = "{CALL estatusEmpleado(?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setString(1, empleado.getCodigo());
            
            //Ejecutar el procedimiento
            cstm.execute();
            //Cerrar los recursos
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return empleado;
    }
  
    public List<DatosEmpleado> buscarEmpleado(String busqueda) {
        
        List<DatosEmpleado> dempleados = new ArrayList<>();
        
        String query = "{call buscarEmpleado(?)}";

        // Se establece una conexión con la base de datos.
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
             CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setString(1, busqueda);
            ResultSet rs = cstm.executeQuery();
           

            // Se recorren los resultados y se crea un objeto Persona para cada registro.
            while (rs.next()) {

                Empleado emp = new Empleado();
                Persona p = new Persona();
                Usuario u = new Usuario();

                int idPersona = rs.getInt("idPersona");
                String nombre = rs.getString("nombre");
                String apellidoPaterno = rs.getString("apellidoPaterno");
                String apellidoMaterno = rs.getString("apellidoMaterno");
                String genero = rs.getString("genero");
                String fechaNacimiento = rs.getString("fechaNacimiento");
                String rfc = rs.getString("rfc");
                String curp = rs.getString("curp");
                String domicilio = rs.getString("domicilio");
                String codigoPostal = rs.getString("codigoPostal");
                String ciudad = rs.getString("ciudad");
                String estado = rs.getString("estado");
                String telefono = rs.getString("telefono");
                String foto = rs.getString("foto");
                int idUsuario = rs.getInt("idUsuario");
                String nombreUsuario = rs.getString("nombreUsuario");
                String rol = rs.getString("rol");
                int idEmpleado = rs.getInt("idEmpleado");
                String codigo = rs.getString("codigo");
                String fechaIngreso = rs.getString("fechaIngreso");
                String puesto = rs.getString("puesto");
                float salarioBruto = rs.getFloat("salarioBruto");
                int activo = rs.getInt("activo");
                int idSucursal = rs.getInt("idSucursal");

                // Cada objeto Persona se agrega a la lista personas.
                Persona persona = new Persona(idPersona, nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, foto, domicilio, codigoPostal, ciudad, estado, telefono);
                Usuario rolUsuario = new Usuario(idUsuario, nombreUsuario, nombre, rol);
                Empleado empleado = new Empleado(idEmpleado, codigo, fechaIngreso, puesto, salarioBruto, activo, persona, rolUsuario, idSucursal);
                DatosEmpleado dempleado = new DatosEmpleado(idPersona, nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto, idUsuario, nombreUsuario, nombre, rol, idEmpleado, codigo, fechaIngreso, puesto, salarioBruto, activo, persona, rolUsuario, idSucursal);
                dempleados.add(dempleado);

                System.out.println(dempleados);
            }
            // Se cierran los recursos de la base de datos
            rs.close();
            cstm.close();
            connMysql.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Finalmente, se devuelve la lista personas que contiene todos los registros de la tabla "persona".
        return dempleados;
    }
}
