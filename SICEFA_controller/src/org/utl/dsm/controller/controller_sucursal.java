package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.model.Sucursal;

public class controller_sucursal {
    
   public Sucursal insertSucursal(Sucursal s) {
        String query = "INSERT INTO Sucursal(idSucursal,nombre,titular,rfc,domicilio,colonia,codigoPostal,ciudad,estado,telefono,latitud,longitud,estatus) "
                + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1,0);
            pstm.setString(2, s.getNombre());
            pstm.setString(3, s.getTitular());
            pstm.setString(4, s.getRfc());
            pstm.setString(5, s.getDomicilio());
            pstm.setString(6, s.getColonia());
            pstm.setString(7, s.getCodigoPostal());
            pstm.setString(8, s.getCiudad());
            pstm.setString(9, s.getEstado());
            pstm.setString(10, s.getTelefono());
            pstm.setString(11, s.getLatitud());
            pstm.setString(12, s.getLongitud());
            pstm.setInt(13, 1);
            pstm.execute();
            pstm.close();
            connMysql.close();

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return s;
    }
   
    public List<Sucursal> getAll() {
        //Se crea una lista llamada personas que almacenará objetos de tipo Persona.
        List<Sucursal> sucursales = new ArrayList<>(); 
        // Se define una consulta SQL que selecciona todos los registros de la tabla "persona".
        String query = "SELECT * FROM sucursal";
 
        // Se establece una conexión con la base de datos.
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();
 
            // Se recorren los resultados y se crea un objeto Persona para cada registro.
            while (rs.next()) {
                int idSucursal = rs.getInt("idSucursal");
                String nombre = rs.getString("nombre");
                String titular = rs.getString("titular");
                String rfc = rs.getString("rfc");
                String domicilio = rs.getString("domicilio");
                String colonia = rs.getString("colonia");
                String codigoPostal = rs.getString("codigoPostal");
                String ciudad = rs.getString("ciudad");
                String estado = rs.getString("estado");
                String telefono = rs.getString("telefono");
                String latitud = rs.getString("latitud");
                String longitud = rs.getString("longitud");
                int estatus = rs.getInt("estatus");
                // Cada objeto Persona se agrega a la lista personas.
                Sucursal s = new Sucursal(idSucursal, nombre, titular, rfc, domicilio,colonia,codigoPostal,ciudad,estado,telefono,latitud, longitud,estatus);
                sucursales.add(s);
            }
            // Se cierran los recursos de la base de datos
            rs.close();
            pstm.close();
            connMysql.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Finalmente, se devuelve la lista personas que contiene todos los registros de la tabla "persona".
        return sucursales;
    }
    
    public void update(Sucursal s) throws SQLException {

        String query = "{CALL sp_updateSucursal(?,?,?,?,?,?,?,?,?,?,?,?)}";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();
        CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
        cstm.setInt(1, s.getIdSucursal());
        cstm.setString(2, s.getNombre());
        cstm.setString(3, s.getTitular());
        cstm.setString(4, s.getRfc());
        cstm.setString(5, s.getDomicilio());
        cstm.setString(6, s.getColonia());
        cstm.setString(7, s.getCodigoPostal());
        cstm.setString(8, s.getCiudad());
        cstm.setString(9, s.getEstado());
        cstm.setString(10, s.getTelefono());
        cstm.setString(11, s.getLatitud());
        cstm.setString(12, s.getLongitud());

        // Ejecutamos el CallableStatement
        cstm.execute();

        // Cerramos todos nuestros objetos de conexión con el servidor
        cstm.close();
        connMysql.close();
        conn.close();
    }

    public Sucursal eliminarSucursal(Sucursal s) {
     String query = "update sucursal set estatus = 0 where idSucursal = ?;";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, s.getIdSucursal());
            pstm.execute();
            System.out.println("delete correcto");
            pstm.close();
            connMysql.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return s;
    }
    
     public List<Sucursal> filtarSucursal(String busqueda) throws SQLException {
        String query = "call sp_buscarSucursal(?);";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();

        CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
        List<Sucursal> resultados = new ArrayList<>();
        cstm.setString(1, busqueda);
        ResultSet rs = cstm.executeQuery();
        try {
            while (rs.next()) {
                int idSucursal = rs.getInt("idSucursal");
                String nombre = rs.getString("nombre");
                String titular = rs.getString("titular");
                String rfc = rs.getString("rfc");
                String domicilio = rs.getString("domicilio");
                String colonia = rs.getString("colonia");
                String codigoPostal = rs.getString("codigoPostal");
                String ciudad = rs.getString("ciudad");
                String estado = rs.getString("estado");
                String telefono = rs.getString("telefono");
                String latitud = rs.getString("latitud");
                String longitud = rs.getString("longitud");
                int estatus = rs.getInt("estatus");
                Sucursal s = new Sucursal(idSucursal, nombre, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud, estatus);
                resultados.add(s);
            }
            rs.close();
            cstm.close();
            connMysql.close();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return resultados;
    }
}
