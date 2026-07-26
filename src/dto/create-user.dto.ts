
export class CreateUser {

    nome: string
    telefone: string
    email: string
    senha: string

    constructor(nome: string, telefone: string, email: string, senha: string) {
        this.nome = nome,
        this.telefone = telefone,
        this.email = email,
        this.senha = senha
    }

}