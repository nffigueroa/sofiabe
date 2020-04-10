export class CreateProductInventory {
  constructor(bodyProduct) {
    this.id_producto = bodyProduct.id_producto;
    this.cantidad = bodyProduct.cantidad;
    this.stock = bodyProduct.stock;
    this.id_sucursal = bodyProduct.id_sucursal;
    this.id_proveedor = bodyProduct.id_proveedor;
    this.barras = bodyProduct.barras;
    this.precio1 = bodyProduct.precio1;
    this.precio2 = bodyProduct.precio2;
    this.iva = bodyProduct.iva;
    this.expiracion = bodyProduct.expiracion;
    this.id_usuario = bodyProduct.id_usuario;
    this.utilidad = bodyProduct.utilidad;
    this.fecha_creacion = bodyProduct.fecha_creacion;
  }

  get dataAsArray() {
    [...this];
  }

}