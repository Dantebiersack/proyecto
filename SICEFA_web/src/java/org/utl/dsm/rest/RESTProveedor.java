package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.text.ParseException;
import org.utl.dsm.controller.ControllerProveedor;
import org.utl.dsm.model.Proveedor;
import java.util.List;
import org.utl.dsm.model.Persona;
import org.utl.dsm.sicefa.model.Persona_Proveedor;

@Path("proveedor")
public class RESTProveedor extends Application {

    @Path("insertarProveedor")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertarProveedor(
            @FormParam("datosProveedor") @DefaultValue("") String datosProveedor
    ) throws ParseException{
        System.out.println(datosProveedor);
        Gson gson = new Gson();
        ControllerProveedor cp = new ControllerProveedor();
        Proveedor p = gson.fromJson(datosProveedor, Proveedor.class);        
        
        cp.insertarProveedorObjeto(p);  
        
        String out = gson.toJson(p);
        return Response.status(201).entity(datosProveedor).build();
    }

    

    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";
 
        try {
            ControllerProveedor cp = new ControllerProveedor();
            List<Persona_Proveedor> proveedor = cp.getAll();
            Gson gs = new Gson();
            out = gs.toJson(proveedor);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("update")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProveedor(@FormParam("datosProveedor")String datosProveedor){
        String out = null;
        Proveedor p = null;
        ControllerProveedor cp = null;
        Gson gson = new Gson();
        try {
            cp = new ControllerProveedor();
            p = gson.fromJson(datosProveedor, Proveedor.class);
            System.out.println("antes de update");
            cp.update(p);
            System.out.println(datosProveedor);
            System.out.println("despues de update");
           out = """
              {"result":"Cambios Realizados"}
              """;
        } catch (Exception e) {
            e.printStackTrace();
            out = "\"result\":\"Error de servicio\", \"error\":\"" + e.getMessage();
        }
        return Response.status(201).entity(datosProveedor).build();
    }
    
@Path("eliminarProveedor")
@POST
@Produces(MediaType.APPLICATION_JSON)
public Response eliminarProveedor(@FormParam("idProveedor") @DefaultValue("") String idProveedor) {
        Gson gson = new Gson();
        ControllerProveedor cp = new ControllerProveedor();
        Proveedor p = gson.fromJson(idProveedor, Proveedor.class);
        System.out.println(idProveedor);
        try {
            cp.eliminar(p);
            return Response.ok("{\"result\":\"El empleado ha sido eliminado\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar eliminar el empleado\"}").build();
        }
}

@Path("buscar")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarproveedor(@QueryParam("busqueda") @DefaultValue("") String busqueda) {
        String out = "";
        System.out.println(busqueda);
        try {
            ControllerProveedor cp = new ControllerProveedor();
            List<Persona_Proveedor> dproveedores = cp.buscarProveedor(busqueda);
            Gson gs = new Gson();
            out = gs.toJson(dproveedores);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

}

