import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { RelatoriosService } from "../service/relatorio.service";
import { AuthGuard } from "../security/auth.guard";

@Controller("/relatorio")
export class RelatorioController {
    constructor(private relatorioService: RelatoriosService) {}

    @UseGuards(AuthGuard)
    @Get("/mensal/categoria")
    relatorioMensalByCategoria(
    @Query("idUser") idUser: number, 
    @Query("idCategoria") idCategoria: number) {

        return this.relatorioService.gastoMensalByCategoria(+idUser, +idCategoria);
    }

    @UseGuards(AuthGuard)
    @Get("/mensal")
    relatorioMensal(
    @Query("idUser") idUser: number) {

        return this.relatorioService.relatorioMensal(+idUser);
    }

}