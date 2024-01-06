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
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.controller.ControllerEmpleado;
import org.utl.dsm.model.DatosEmpleado;
import org.utl.dsm.model.Empleado;
//import org.utl.dsm.model.Persona;

@Path("empleado")
public class RestEmpleado {

    @Path("insertarEmpleado")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response insertEmpleado(@FormParam("datosEmpleado") @DefaultValue("{}") String datosEmpleado) { // Asignar un valor por defecto al parámetro
        //System.out.println(datosEmpleado);
        Gson gson = new Gson();
        ControllerEmpleado ce = new ControllerEmpleado();
        Empleado e = gson.fromJson(datosEmpleado, Empleado.class);
        //System.out.println(e.toString());
        try {
            ce.insertEmpleado(e);
            return Response.ok("{\"result\":\"Empleado registrado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar registrar el empleado\"}").build();
        }
    }

    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";

        try {
            ControllerEmpleado ce = new ControllerEmpleado();
            List<DatosEmpleado> dempleados = ce.getAll();
            Gson gs = new Gson();
            out = gs.toJson(dempleados);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("update")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)

    public Response updateEmpleado(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) {
        String out = null;
        DatosEmpleado p = null;
        ControllerEmpleado cp = null;
        Gson gson = new Gson();
        try {
            cp = new ControllerEmpleado();
            p = gson.fromJson(datosEmpleado, DatosEmpleado.class);
            //cp.updateEmpleado(p);
            cp.updateEmpleado(p);
            System.out.println(datosEmpleado);
            out = """
              {"result":"Cambios Realizados"}
              """;
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"result\":\"Error de servicio\", \"error\":\"" + e.getMessage() + "\"}";
        }
        return Response.ok(out).build();
    }

    @Path("eliminarEmpleado")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response getEmpleadoEditar(@FormParam("codigo") @DefaultValue("") String codigo) {
        Gson gson = new Gson();
        ControllerEmpleado ce = new ControllerEmpleado();
        Empleado e = gson.fromJson(codigo, Empleado.class);
        System.out.println(codigo);
        try {
            ce.eliminarEmpleado(e);
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
            ControllerEmpleado ce = new ControllerEmpleado();
            List<DatosEmpleado> dempleados = ce.buscarEmpleado(busqueda);
            Gson gs = new Gson();
            out = gs.toJson(dempleados);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
}
