import { Injectable, NotFoundException } from "@nestjs/common"
import { Prisma } from "../../prisma/prisma.service"
import { CreateEconomia } from "../dto/create-economia.dto"
import { lt } from "date-fns/locale"

@Injectable()
export class EconomiaRepository {

    findByIdUser(idUser: number) {
        return Prisma.economia.findUnique({
            where: {
                idUser: idUser
            }
        })
    }

    guardarDinheiro(dto: CreateEconomia) {
        return Prisma.economia.create({
            data: dto
        })
    }

    listarEconomiasById(idUser: number) {
        return Prisma.economia.findFirst({
            where: {
                idUser: idUser
            }
        })
    }

    async diminuirValor(idUser: number, valorDiminuir: number) {
    const encontrado = await Prisma.economia.findFirst({
        where: {
            idUser: idUser,
            valor: {
                gte: valorDiminuir
            }
        }
    })

    if (!encontrado) {
        throw new NotFoundException("Saldo insuficiente ou economia não encontrada")
    }

    const valorAtual = encontrado.valor - valorDiminuir; 

    return Prisma.economia.update({
        data: {
            valor: valorAtual
        },
        where: {
            idEconomia: encontrado.idEconomia
        }
    })
}


    async aumentarValor(idUser: number, valorAumentar: number) {
    const encontrado = await Prisma.economia.findFirst({
        where: {
            idUser: idUser
        }
    })

    if (!encontrado) {
        throw new NotFoundException("Saldo insuficiente ou economia não encontrada")
    }

    const valorAtual = encontrado.valor + valorAumentar; 

    return Prisma.economia.update({
        data: {
            valor: valorAtual
        },
        where: {
            idEconomia: encontrado.idEconomia
        }
    })
}
}