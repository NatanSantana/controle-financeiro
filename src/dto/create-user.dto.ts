
export class CreateUser {

    nome: string
    telefone: string
    email: string
    senha: string
    rendaMensal: number

    constructor(nome: string, telefone: string, email: string, senha: string, rendaMensal: number) {
        this.nome = nome,
        this.telefone = telefone,
        this.email = email,
        this.senha = senha
        this.rendaMensal = rendaMensal
    }

}