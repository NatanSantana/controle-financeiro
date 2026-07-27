import { Controller, Get, Query } from "@nestjs/common";
import { RelatoriosService } from "../service/relatorio.service";

@Controller("/relatorio")
export class RelatorioController {
    constructor(private relatorioService: RelatoriosService) {}

    @Get("/mensal/categoria")
    relatorioMensalByCategoria(
    @Query("idUser") idUser: number, 
    @Query("idCategoria") idCategoria: number) {

        return this.relatorioService.gastoMensalByCategoria(+idUser, +idCategoria);
    }

    @Get("/mensal")
    relatorioMensal(
    @Query("idUser") idUser: number) {

        return this.relatorioService.relatorioMensal(+idUser);
    }

}