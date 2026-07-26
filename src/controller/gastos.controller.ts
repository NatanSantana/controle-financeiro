import { Body, Controller, Post } from "@nestjs/common";
import { CreateGasto } from "../dto/create-gasto.dto";
import { GastosService } from "../service/gastos.service";

@Controller("/gastos")
export class GastosController {
    constructor(private gastoService: GastosService) {}

    @Post()
    async registrarGasto(@Body() dto: CreateGasto) {
        return this.gastoService.registrarGasto(dto);
    }


}