export interface Client {
    id_sucursal?: number,
    id_cliente?: number,
    nombre_cliente: string,
    apellido_cliente: string,
    telefono_cliente: string,
    direccion_cliente: string,
    mail_cliente: string,
    id_ciudad: number,
    id_usuario: number,
    cedula_cliente: string,
    esJuridico: boolean,
    declaraIva: boolean,
    declaraIca: boolean,
    reteFuente: boolean,
    milesIca: boolean,
    reteIva: boolean,
    dv: number,

}