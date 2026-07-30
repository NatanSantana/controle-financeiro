import { Injectable, NotFoundException } from "@nestjs/common"
import { Prisma } from "../../prisma/prisma.service"
import { CreateEconomia } from "../dto/create-economia.dto"
import { lt } from "date-fns/locale"

@Injectable()
export class EconomiaRepository {

    guardarDinheiro(dto: CreateEconomia) {
        return Prisma.economia.create({
            data: dto
        })
    }

    listarEconomiasById(idUser: number) {
        return Prisma.economia.findMany({
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
                    lte: valorDiminuir
                }
            }
        })

        if (!encontrado) {
            throw new NotFoundException("Valor não encontrado")
        }

        const valorAtual = encontrado.valor - valorDiminuir;

        return Prisma.economia.update({
            data: {
                valor: valorAtual
            },
            where: {
                idEconomia: encontrado.idEconomia,
                idUser: idUser,
                valor: {
                    lte: valorDiminuir
                }

            }
        })
    }


    async aumentarValor(idUser: number, valorAumentar: number) {
        const encontrado = await Prisma.economia.findFirst({
            where: {
                idUser: idUser,
                valor: {
                    lte: valorAumentar
                }
            }
        })

        if (!encontrado) {
            throw new NotFoundException("Valor não encontrado")
        }

        const valorAtual = encontrado.valor + valorAumentar;

        return Prisma.economia.update({
            data: {
                valor: valorAtual
            },
            where: {
                idEconomia: encontrado.idEconomia,
                idUser: idUser,
                valor: {
                    lte: valorAumentar
                }

            }
        })
    }
}