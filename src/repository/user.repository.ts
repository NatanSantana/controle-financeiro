import { Injectable } from "@nestjs/common";
import { Prisma } from "../../prisma/prisma.service"
import { CreateUser } from "../dto/create-user.dto";

@Injectable()
export class UserRepository {
    

    registrarUser(dto: CreateUser) {
        return Prisma.user.create({
            data: dto
        })
    }

    findByEmail(emailUser: string) {
        return Prisma.user.findUnique({
            where: {
                email: emailUser
            }
        })
    }

    findById(id: number) {
        return Prisma.user.findUnique({
            where: {
                idUser: id
            }
        })
    }

    buscarRendaMensal(idUser: number) {
        return Prisma.user.findUnique({
            select: {
                rendaMensal: true
            },
            where: {
                idUser: idUser
            }
        })
    }

}