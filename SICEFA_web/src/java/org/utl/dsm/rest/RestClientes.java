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
import java.text.ParseException;
import java.util.List;
import org.utl.dsm.controller.ControllerCliente;

import org.utl.dsm.model.Cliente;
import org.utl.dsm.model.Persona_Cliente;

@Path("persona")
public class RestClientes extends Application {

    @Path("cliente")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)

    public Response insertCliente(
            @FormParam("cliente") String clienteJson) throws ParseException {

        // 1. Mapear JSON a Cliente
        Gson gson = new Gson();
        ControllerCliente cp = new ControllerCliente();
        Cliente cliente = gson.fromJson(clienteJson, Cliente.class);

        cp.insertarClienteObjeto(cliente);
        return Response.status(201).entity(clienteJson).build();
    }
    
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";
 
        try {
            ControllerCliente cp = new ControllerCliente();
            List<Persona_Cliente> clientes = cp.getAll();
            Gson gs = new Gson();
            out = gs.toJson(clientes);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("update")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEmpleado(@FormParam("cliente") String cliente) {
        String out = null;
        Cliente c = null;
        ControllerCliente cp = null;
        Gson gson = new Gson();
        try {
            cp = new ControllerCliente();
            c = gson.fromJson(cliente, Cliente.class);
            
            
            cp.update(c);
            System.out.println(cliente);
            out = """
              {"result":"Cambios Realizados"}
              """;
        } catch (Exception e) {
            e.printStackTrace();
            out = "\"result\":\"Error de servicio\", \"error\":\"" + e.getMessage();
        }
        return Response.status(201).entity(cliente).build();
    }
    
    
    @Path("eliminarCliente")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response getEmpleadoEditar(@FormParam("id") @DefaultValue("") String id) {
        Gson gson = new Gson();
        ControllerCliente ce = new ControllerCliente();
        Cliente e = gson.fromJson(id, Cliente.class);
        System.out.println(id);
        try {
            ce.eliminar(e);
            return Response.ok("{\"result\":\"El empleado ha sido eliminado\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar eliminar el empleado\"}").build();
        }
    }
    
    @Path("buscar")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarEmpleado(@QueryParam("busqueda") @DefaultValue("") String busqueda) {
        String out = "";
        System.out.println(busqueda);
        try {
            ControllerCliente ce = new ControllerCliente();
            List<Persona_Cliente> dempleados = ce.buscarCliente(busqueda);
            Gson gs = new Gson();
            out = gs.toJson(dempleados);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
}
