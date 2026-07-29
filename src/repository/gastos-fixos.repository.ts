import { Injectable } from "@nestjs/common";
import { CreateGastoFixo } from "../dto/create-gastofixo.dto";
import { Prisma } from "../../prisma/prisma.service"

@Injectable()
export class GastosFixosRepository {

    adicionar(dto: CreateGastoFixo) {
        return Prisma.gastosFixos.create({
            data: dto
        })
    }

    listarGastosFixosByUser(idUser: number) {
        return Prisma.gastosFixos.findMany({
            where: {
                idUser: idUser
            }
        })
    }

}