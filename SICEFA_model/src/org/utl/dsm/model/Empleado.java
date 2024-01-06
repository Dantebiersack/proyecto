package org.utl.dsm.model;

public class Empleado {

    private int idEmpleado;
    private String codigo;
    private String fechaIngreso;
    private String puesto;
    private float salarioBruto;
    private int activo;
    private Persona persona;
    private Usuario rolUsuario;
    private int idSucursal;

    public Empleado() {
    }

    
    public Empleado(int idEmpleado, String codigo, String fechaIngreso, String puesto, float salarioBruto, int activo, Persona persona, Usuario rolUsuario, int idSucursal) {
        this.idEmpleado = idEmpleado;
        this.codigo = codigo;
        this.fechaIngreso = fechaIngreso;
        this.puesto = puesto;
        this.salarioBruto = salarioBruto;
        this.activo = activo;
        this.persona = persona;
        this.rolUsuario = rolUsuario;
        this.idSucursal = idSucursal;
    }

    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public float getSalarioBruto() {
        return salarioBruto;
    }

    public void setSalarioBruto(float salarioBruto) {
        this.salarioBruto = salarioBruto;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Usuario getRolUsuario() {
        return rolUsuario;
    }

    public void setRolUsuario(Usuario rolUsuario) {
        this.rolUsuario = rolUsuario;
    }

    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
    }

    @Override
    public String toString() {
        return "Empleado{" + "idEmpleado=" + idEmpleado + ", codigo=" + codigo + ", fechaIngreso=" + fechaIngreso + ", puesto=" + puesto + ", salarioBruto=" + salarioBruto + ", activo=" + activo + ", persona=" + persona + ", rolUsuario=" + rolUsuario + ", idSucursal=" + idSucursal + '}';
    }
}
