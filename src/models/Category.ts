export interface Category {
  categoria: string;
  id_usuario?: number; //idUsuario es opcional por que se necesita para la creaciòn pero no para la modificacion.
  id_categoria?: number; // idCatgoria es opcional por que se necesita para la modificaciòn pero no para la creaciòn.
}

