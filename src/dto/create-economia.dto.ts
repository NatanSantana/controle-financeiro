
export class CreateEconomia {

    valor: number
    idUser: number
    data?: Date

    constructor(valor: number, idUser: number, data?: Date) {
        this.valor = valor
        this.idUser = idUser
        this.data = data
    }

}