package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.model.Producto;

public class ControllerProducto {

    public Producto insertProducto(Producto p) {
        String query = "INSERT INTO producto(idProducto, nombre, nombreGenerico, formaFarmaceutica, unidadMedida, presentacion, principalIndicacion, contraindicaciones, concentracion, unidadesEnvase, precioCompra, precioVenta, foto, rutaFoto, codigoBarras, estatus) "
                + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, 0);
            pstm.setString(2, p.getNombre());
            pstm.setString(3, p.getNombreGenerico());
            pstm.setString(4, p.getFormaFarmaceutica());
            pstm.setString(5, p.getUnidadMedida());
            pstm.setString(6, p.getPresentacion());
            pstm.setString(7, p.getPrincipalIndicacion());
            pstm.setString(8, p.getContraindicaciones());
            pstm.setString(9, p.getConcentracion());
            pstm.setInt(10, p.getUnidadesEnvase());
            pstm.setFloat(11, p.getPrecioCompra());
            pstm.setFloat(12, p.getPrecioVenta());
            pstm.setString(13, p.getFoto());
            pstm.setString(14, p.getRutaFoto());
            pstm.setString(15, p.getCodigoBarras());
            pstm.setInt(16, 1);
            pstm.execute();
            System.out.println("Insert correcto");
            pstm.close();
            connMysql.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return p;
    }

    public List<Producto> getAll() {
        List<Producto> productos = new ArrayList<>();

        String query = "SELECT * FROM producto";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                int idProducto = rs.getInt("idProducto");
                String nombre = rs.getString("nombre");
                String nombreGenerico = rs.getString("nombreGenerico");
                String formaFarmaceutica = rs.getString("formaFarmaceutica");
                String unidadMedida = rs.getString("unidadMedida");
                String presentacion = rs.getString("presentacion");
                String principalIndicacion = rs.getString("principalIndicacion");
                String contraindicaciones = rs.getString("contraindicaciones");
                String concentracion = rs.getString("concentracion");
                int unidadesEnvase = rs.getInt("unidadesEnvase");
                float precioCompra = rs.getFloat("precioCompra");
                float precioVenta = rs.getFloat("precioVenta");
                String foto = rs.getString("foto");
                String rutaFoto = rs.getString("rutaFoto");
                String codigoBarras = rs.getString("codigoBarras");
                int estatus = rs.getInt("estatus");

                Producto p = new Producto(idProducto, nombre, nombreGenerico, formaFarmaceutica, unidadMedida, presentacion, principalIndicacion, contraindicaciones, concentracion, unidadesEnvase, precioCompra, precioVenta, foto, rutaFoto, codigoBarras, estatus);
                productos.add(p);
            }
            rs.close();
            pstm.close();
            connMysql.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return productos;
    }

    public void updateProducto(Producto p) throws SQLException {
        System.out.println("llegamos al controller");
        System.out.println("Nombre:" + p.getNombre());
        String query = "call sp_updateProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();
        CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
        cstm.setInt(1, p.getIdProducto());
        cstm.setString(2, p.getNombre());
        cstm.setString(3, p.getNombreGenerico());
        cstm.setString(4, p.getFormaFarmaceutica());
        cstm.setString(5, p.getUnidadMedida());
        cstm.setString(6, p.getPresentacion());
        cstm.setString(7, p.getPrincipalIndicacion());
        cstm.setString(8, p.getContraindicaciones());
        cstm.setString(9, p.getConcentracion());
        cstm.setInt(10, p.getUnidadesEnvase());
        cstm.setFloat(11, p.getPrecioCompra());
        cstm.setFloat(12, p.getPrecioVenta());
        cstm.setString(13, p.getFoto());
        cstm.setString(14, p.getRutaFoto());
        cstm.setString(15, p.getCodigoBarras());
        // ejecutamos el PreparedStatement
        cstm.execute();
        //Cerramos todos nuestros objetos de conexión con el servidor
        cstm.close();
        connMysql.close();
        conn.close();
    }

    public Producto eliminarProducto(Producto p) {
        String query = "call sp_cambiarEstatusProducto(?);";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
             CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setInt(1, p.getIdProducto());
            cstm.execute();
            System.out.println("delete correcto");
            cstm.close();
            connMysql.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return p;
    }

    public List<Producto> filtarProducto(String busqueda) throws SQLException {
        String query = "call sp_buscarProducto(?);";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();
        CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
        List<Producto> resultados = new ArrayList<>();
        cstm.setString(1, busqueda);
        ResultSet rs = cstm.executeQuery();
        try {
            while (rs.next()) {
                int idProducto = rs.getInt("idProducto");
                String nombre = rs.getString("nombre");
                String nombreGenerico = rs.getString("nombreGenerico");
                String formaFarmaceutica = rs.getString("formaFarmaceutica");
                String unidadMedida = rs.getString("unidadMedida");
                String presentacion = rs.getString("presentacion");
                String principalIndicacion = rs.getString("principalIndicacion");
                String contraindicaciones = rs.getString("contraindicaciones");
                String concentracion = rs.getString("concentracion");
                int unidadesEnvase = rs.getInt("unidadesEnvase");
                float precioCompra = rs.getFloat("precioCompra");
                float precioVenta = rs.getFloat("precioVenta");
                String foto = rs.getString("foto");
                String rutaFoto = rs.getString("rutaFoto");
                String codigoBarras = rs.getString("codigoBarras");
                int estatus = rs.getInt("estatus");
                Producto p = new Producto(idProducto, nombre, nombreGenerico, formaFarmaceutica, unidadMedida, presentacion, principalIndicacion, contraindicaciones, concentracion, unidadesEnvase, precioCompra, precioVenta, foto, rutaFoto, codigoBarras, estatus);
                resultados.add(p);
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
