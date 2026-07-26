export class CreateGasto {
    valor: number
    descricao: string
    idUser: number

    constructor(valor: number, descricao: string, idUser: number) {
        this.valor = valor
        this.descricao = descricao
        this.idUser = idUser
    }
}