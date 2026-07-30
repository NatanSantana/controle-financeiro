export class CreateCategoria {
  nome: string;
  idUser: number;

  constructor(nome: string, idUser: number) {
    this.nome = nome;
    this.idUser = idUser;
  }
}
