package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;
import org.utl.dsm.controller.ControllerProducto;
import org.utl.dsm.model.Producto;

@Path("producto")
public class RESTProducto extends Application {

    @Path("insertProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    
    public Response insertarProducto(
            @FormParam("datosProducto") @DefaultValue("") String producto
    ) {
        System.out.println(producto);
        Gson gson = new Gson();
        ControllerProducto cp = new ControllerProducto();
        Producto p = gson.fromJson(producto, Producto.class);
        System.out.println(p.getNombre());
        cp.insertProducto(p);
        String out = gson.toJson(p);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";
        try {
            ControllerProducto cp = new ControllerProducto();
            List<Producto> productos = cp.getAll();
            Gson gs = new Gson();
            out = gs.toJson(productos);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("buscarProducto")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarProducto(@QueryParam("busqueda") @DefaultValue("") String busqueda) {
        String jsonResult="";
        try {
            ControllerProducto cp = new ControllerProducto();
            List<Producto> resultados = cp.filtarProducto(busqueda);
            Gson gson = new Gson();
            jsonResult = gson.toJson(resultados);
            return Response.ok(jsonResult).build();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al buscar").build();
        }
    }

    @Path("updateProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProducto(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {
        String out = null;
        Producto p = null;
        ControllerProducto cp = null;
        Gson gson = new Gson();
        try {
            cp = new ControllerProducto();
            p = gson.fromJson(datosProducto, Producto.class);
            cp.updateProducto(p);
            System.out.println(datosProducto);
            out = """
              {"result":"Cambios Realizados"}
              """;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            out = """
              {"result":"Error de servidor"}
              """;
        }
        return Response.ok(out).build();
    }

    @Path("eliminarProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarProducto(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {
        String out = null;
        Producto p = null;
        ControllerProducto cp = null;
        Gson gson = new Gson();
        try {
            cp = new ControllerProducto();
            p = gson.fromJson(datosProducto, Producto.class);
            cp.eliminarProducto(p);
            System.out.println(datosProducto);
            out = """
              {"result":"Cambios Realizados"}
              """;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            out = """
              {"result":"Error de servidor"}
              """;
        }
        return Response.ok(out).build();
    }

}
