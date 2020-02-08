export class CreateNewClient  {
    constructor(bodyClient) {
    this.idSucursal = bodyClient.idSucursal ,
    this.nombre = bodyClient.nombre,
    this.apellido = bodyClient.apellido,
    this.telefono = bodyClient.telefono ,
    this.direccion = bodyClient.direccion,
    this.mail = bodyClient.mail,
    this.id_ciudad = bodyClient.id_ciudad ,
    this.id_usuario = bodyClient.id_usuario ,
    this.iden = bodyClient.iden ,
    this.tipoCliente = bodyClient.tipoCliente, 
    this.declaraIva = bodyClient.declaraIva,
    this.declaraIca = bodyClient.declaraIca,
    this.reteFuente = bodyClient.reteFuente,
    this.milesIca = bodyClient.milesIca,
    this.dv = bodyClient.dv 
    }

    get clientBody() {
        return [
            this.idSucursal,
            this.nombre,
            this.apellido,
            this.telefono,
            this.direccion,
            this.mail,
            this.id_ciudad,
            this.id_usuario,
            this.iden,
            this.tipoCliente, 
            this.declaraIva,
            this.declaraIca,
            this.reteFuente,
            this.milesIca,
            this.dv
        ]
    }
}