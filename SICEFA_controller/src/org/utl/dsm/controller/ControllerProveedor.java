package org.utl.dsm.controller;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.model.Proveedor;
import org.utl.dsm.model.Persona;
import org.utl.dsm.sicefa.model.Persona_Proveedor;

public class ControllerProveedor {

    public Proveedor insertarProveedorObjeto(Proveedor p) throws ParseException {

        System.out.println("lo que llega al statement");
        System.out.println(p.toString());

        String query = "{CALL insertarProveedor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement pstm = (CallableStatement) conn.prepareCall(query);
            //DATOS DE LA PERSONA            
            pstm.setString(1, p.getPersona().getNombre());
            pstm.setString(2, p.getPersona().getApellidoPaterno());
            pstm.setString(3, p.getPersona().getApellidoMaterno());
            pstm.setString(4, p.getPersona().getGenero());
            pstm.setString(5, p.getPersona().getFechaNacimiento());
            pstm.setString(6, p.getPersona().getRfc());
            pstm.setString(7, p.getPersona().getCurp());
            pstm.setString(8, p.getPersona().getDomicilio());
            pstm.setString(9, p.getPersona().getCodigoPostal());
            pstm.setString(10, p.getPersona().getCiudad());
            pstm.setString(11, p.getPersona().getEstado());
            pstm.setString(12, p.getPersona().getTelefono());
            pstm.setString(13, p.getPersona().getFoto());
            //DATOS PROVEEDOR
            pstm.setString(14, p.getEmail());
            //Registro los parametros de salida
            pstm.registerOutParameter(15, java.sql.Types.INTEGER); //idPersona
            pstm.registerOutParameter(16, java.sql.Types.INTEGER); //idProveedor            
            pstm.execute();

            p.getPersona().setIdPersona(pstm.getInt(16));
            System.out.println("Insert correcto");
            pstm.close();
            connMysql.close();

        } catch (SQLException e) {
            e.getStackTrace();
            e.printStackTrace();
        }
        return p;
    }

    public List<Persona_Proveedor> getAll() {
        //Se crea una lista llamada personas que almacenará objetos de tipo Persona.
        ArrayList<Persona_Proveedor> lista = new ArrayList<>();
        // Se define una consulta SQL que selecciona todos los registros de la tabla "persona".
        String query = "SELECT * FROM view_proveedor;";

        // Se establece una conexión con la base de datos.
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            // Se recorren los resultados y se crea un objeto Proveedor para cada registro.
            while (rs.next()) {
                int idPersona = rs.getInt("idPersona");
                String nombre = rs.getString("nombre");
                String apellidoPaterno = rs.getString("apellidoPaterno");
                String apellidoMaterno = rs.getString("apellidoMaterno");
                String telefono = rs.getString("telefono");
                String email = rs.getString("email");
                String fechaRegistro = rs.getString("fechaRegistro");
                int estatus = rs.getInt("estatus");
                String genero = rs.getString("genero");
                String fechaNacimiento = rs.getString("fechaNacimiento");
                String rfc = rs.getString("rfc");
                String curp = rs.getString("curp");
                String domicilio = rs.getString("domicilio");
                String codigoPostal = rs.getString("codigoPostal");
                String ciudad = rs.getString("ciudad");
                String estado = rs.getString("estado");

                // Cada objeto Persona se agrega a la lista personas.
                Persona_Proveedor proveedor = new Persona_Proveedor(idPersona, nombre, apellidoPaterno, apellidoMaterno, telefono, email, fechaRegistro,
                        estatus, genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal, ciudad, estado);
                lista.add(proveedor);
            }
            // Se cierran los recursos de la base de datos
            rs.close();
            pstm.close();
            connMysql.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Finalmente, se devuelve la lista personas que contiene todos los registros de la tabla "persona".
        return lista;
    }

    public void update(Proveedor p) throws SQLException {
        System.out.println("LLegamos al controller");
        try {
            String query = "{CALL modificarProveedor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setString(1, p.getPersona().getNombre());
            cstm.setString(2, p.getPersona().getApellidoPaterno());
            cstm.setString(3, p.getPersona().getApellidoMaterno());
            cstm.setString(4, p.getPersona().getGenero());
            cstm.setString(5, p.getPersona().getFechaNacimiento());
            cstm.setString(6, p.getPersona().getRfc());
            cstm.setString(7, p.getPersona().getCurp());
            cstm.setString(8, p.getPersona().getDomicilio());
            cstm.setString(9, p.getPersona().getCodigoPostal());
            cstm.setString(10, p.getPersona().getCiudad());
            cstm.setString(11, p.getPersona().getEstado());
            cstm.setString(12, p.getPersona().getTelefono());
            cstm.setString(13, p.getEmail());
            cstm.setInt(14, p.getPersona().getIdPersona());
            cstm.setInt(15, p.getIdProveedor());
            // ejecutamos el PreparedStatement
            cstm.execute();
            //Cerramos todos nuestros objetos de conexión con el servidor
            cstm.close();
            connMysql.close();
            conn.close();

        } catch (SQLException ex) {
            Logger.getLogger(ControllerProveedor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void eliminar(Proveedor p) throws SQLException {
        String query = "{CALL eliminarProveedor(?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setInt(1, p.getIdProveedor());
            System.out.println(p.getIdProveedor());
            cstm.execute();
            cstm.close();
            connMysql.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Persona_Proveedor> buscarProveedor(String busqueda) {

        List<Persona_Proveedor> dproveedor = new ArrayList<>();

        String query = "{CALL buscarProveedor(?)}";

        // Se establece una conexión con la base de datos.
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setString(1, busqueda);
            ResultSet rs = cstm.executeQuery();
            // Se recorren los resultados y se crea un objeto Persona para cada registro.
            while (rs.next()) {
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

                int estatus = rs.getInt("estatus");
                String email = rs.getString("email");
                String fechaRegistro = rs.getString("fechaRegistro");

                // Cada objeto Persona se agrega a la lista personas.
                Persona_Proveedor proveedor = new Persona_Proveedor(idPersona, nombre, apellidoPaterno,
                        apellidoMaterno, telefono, email, fechaRegistro, estatus,
                        genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal,
                        ciudad, estado);
                dproveedor.add(proveedor);

                System.out.println(dproveedor);
            }
            // Se cierran los recursos de la base de datos
            rs.close();
            cstm.close();
            connMysql.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Finalmente, se devuelve la lista personas que contiene todos los registros de la tabla "persona".
        return dproveedor;
    }

}
