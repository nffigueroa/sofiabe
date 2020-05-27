export interface User {
    nombre_usuario: string,
    apellido_usuario: string,
    cc_usuario: string,
    telefono_usuario: string,
    usuario: string,
    id_usuario: number,
    id_sucursal: number,
    id_cargo: number,
    fecha_creacion: string,
    id_regimen: number,
    id_empresa: number,
    token?: string,
    password?: string,
    direccion_usuario?: string,
    descripcion?: string
}