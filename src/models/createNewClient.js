export class CreateNewClient  {
    constructor(bodyClient) {
    this.idSucursal = bodyClient.idSucursal ,
    this.nombre = bodyClient.nombre_cliente,
    this.apellido = bodyClient.apellido_cliente,
    this.telefono = bodyClient.telefono_cliente ,
    this.direccion = bodyClient.direccion_cliente,
    this.mail = bodyClient.mail_cliente,
    this.id_ciudad = bodyClient.ciudad ,
    this.id_usuario = bodyClient.id_usuario ,
    this.iden = bodyClient.cedula_cliente ,
    this.tipoCliente = bodyClient.tipoCliente, 
    this.declaraIva = bodyClient.declaraIva,
    this.declaraIca = bodyClient.declaraIca,
    this.reteFuente = bodyClient.retefuente,
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