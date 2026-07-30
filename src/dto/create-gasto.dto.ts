export class CreateGasto {
  valor: number;
  descricao: string;
  idUser: number;
  dataCompra?: Date;
  idCategoria?: number;

  constructor(
    valor: number,
    descricao: string,
    idUser: number,
    dataCompra?: Date,
    idCategoria?: number,
  ) {
    this.valor = valor;
    this.descricao = descricao;
    this.idUser = idUser;
    this.dataCompra = dataCompra;
    this.idCategoria = idCategoria;
  }
}
