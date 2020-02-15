export class CreateNewProvider {
    constructor(bodyProvider) {
        this.empresa = bodyProvider.empresa;
        this.contacto = bodyProvider.contacto;
        this.telefono = bodyProvider.telefono;
        this.direccion = bodyProvider.direccion;
        this.mail = bodyProvider.mail;
        this.id_ciudad = bodyProvider.id_ciudad;
        this.nit = bodyProvider.bit;
        this.id_usuario = bodyProvider.id_usuario;
        this.fecha_crea = bodyProvider.fecha_crea;
        this.id_sucursal = bodyProvider.id_sucursal;
    }
    get dataAsArray() {
        return [...this];
    }
}