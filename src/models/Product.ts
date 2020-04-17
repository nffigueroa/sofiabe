export interface Product {
  id_Produccto: number;
  nombre_producto: string;
  id_categoria: number;
  id_medicion: number | string;
  id_presentacion: number;
  id_marca: number;
  id_usuario?: number; // Optional , id_usuario from the user who is creating or updating the model
}
