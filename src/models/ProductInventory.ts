export interface ProductInventory {
  id_Produccto: number;
  cantidad: number;
  stock: number;
  id_sucursal: number;
  id_proveedor: number;
  barras: string;
  precio1: number;
  precio2: number;
  iva: string;
  expiracion: string;
  id_usuario: number;
  utilidad: number;
  fecha_creacion: string;
  id_producto_inventario?: number;
}
