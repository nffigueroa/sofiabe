export interface ProductInventory {
    id_producto: number,
    cantidad: number,
    stock: number,
    id_sucursal: number,
    id_proveedor: number,
    barras: string,
    precio1: string,
    precio2: string,
    iva: string,
    expiracion: string,
    id_usuario: number,
    utilidad: string,
    fecha_creacion: string,
    id_producto_inventario?: number
}