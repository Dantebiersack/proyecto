package org.utl.dsm.rest;

import com.google.gson.Gson;
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
import org.utl.dsm.controller.controller_sucursal;
import org.utl.dsm.model.Sucursal;

@Path("sucursal")
public class RestSucursal extends Application {
    
    @Path("insert")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(
            @FormParam("datosSucursal") @DefaultValue("") String _sucursal
    ) {
        System.out.println(_sucursal);
        Gson gson = new Gson();
        controller_sucursal cs = new controller_sucursal();
        Sucursal s = gson.fromJson(_sucursal, Sucursal.class);
        cs.insertSucursal(s);
        String out = gson.toJson(s);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }  

    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";

        try {
            controller_sucursal cs = new controller_sucursal();
            List<Sucursal> sucursales = cs.getAll();
            Gson gs = new Gson();
            out = gs.toJson(sucursales);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    //Generamos el servico REST para actualizar un registro de la tabla persona 
    @Path("update")
    @POST
    @Produces(MediaType.APPLICATION_JSON)

    public Response update (@FormParam("datosSucursal") @DefaultValue("") String datosSucursal) {
        String out = null;
        Sucursal s = null;
        controller_sucursal cs = null;
        Gson gson = new Gson();

        try {
            cs = new controller_sucursal();
            s = gson.fromJson(datosSucursal, Sucursal.class);
            cs.update(s);
            System.out.println(datosSucursal);
            out = """ 
              {"result":"Cambios Realizados"} 
              """;
        } catch (Exception e) {
            e.printStackTrace();
            out = """ 
              {"result":"Error de servidor"} 
              """;
        }
        return Response.ok(out).build();
    }
    
    @Path("eliminarSucursal")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarSucursal(@FormParam("datosSucursal") @DefaultValue("") String datosSucursal) {
        String out = null;
        Sucursal s = null;
        controller_sucursal cs = null;
        Gson gson = new Gson();
        try {
            cs = new controller_sucursal();
            s= gson.fromJson(datosSucursal, Sucursal.class);
            cs.eliminarSucursal(s);
            System.out.println(datosSucursal);
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
    
    @Path("buscarSucursal")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarSucursal(@QueryParam("busqueda") @DefaultValue("") String busqueda) {
        String jsonResult="";
        try {
            controller_sucursal cs = new controller_sucursal ();
            List<Sucursal> resultados = cs.filtarSucursal(busqueda);
            Gson gson = new Gson();
            jsonResult = gson.toJson(resultados);
            return Response.ok(jsonResult).build();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al buscar").build();
        }
    }
}
