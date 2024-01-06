package org.utl.dsm.model;

public class Proveedor {
    private int idProveedor;
    private String email;
    private String fechaRegistro;
    private int estatus;
    private Persona persona;
    
    
    public Proveedor() {
    }

    public Proveedor(int idProveedor, String email, String fechaRegistro, int estatus, Persona persona) {
        this.idProveedor = idProveedor;
        this.email = email;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.persona = persona;
    }

    public int getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(int idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    @Override
    public String toString() {
        return "Proveedor{" + "idProveedor=" + idProveedor + ", email=" + email + ", fechaRegistro=" + fechaRegistro + ", estatus=" + estatus + ", persona=" + persona + '}';
    }

    
    
}