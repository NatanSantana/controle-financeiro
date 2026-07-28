import { Injectable } from "@nestjs/common";
import { CreateCategoria } from "../dto/create-categoria.dto";
import { Prisma } from "../../prisma/prisma.service"

@Injectable()
export class CategoriaRepository {

    adicionarCategoria(dto: CreateCategoria) {
        return Prisma.categoriasGasto.create({
            data: dto
        })
    }

    findById(idCategoria: number) {
        return Prisma.categoriasGasto.findUnique({
            where: {
                idCategoria: idCategoria
            }
        })
    }

    allCategoriasByUser(idUser: number) {
        return Prisma.categoriasGasto.findMany({
            where: {
                idUser: idUser
            }
        })
    }


}