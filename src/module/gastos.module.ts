import { Module } from "@nestjs/common";
import { GastosController } from "../controller/gastos.controller";
import { GastosService } from "../service/gastos.service";
import { GastoRepository } from "../repository/gastos.repository";
import { UserRepository } from "../repository/user.repository";

@Module({
    imports: [],
    controllers: [GastosController],
    providers: [GastosService, GastoRepository, UserRepository]
})
export class GastosModule {}