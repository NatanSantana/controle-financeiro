import { Injectable } from "@nestjs/common";
import { CreateGasto } from "../dto/create-gasto.dto";
import { Prisma } from "../../prisma/prisma.service"

@Injectable()
export class GastoRepository {


    registrarGasto(dto: CreateGasto) {
        return Prisma.gastos.create({
            data: dto
        })
    }


}