import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { RelatoriosService } from "../service/relatorio.service";
import { AuthGuard } from "../security/auth.guard";
import { CurrentUser } from "../decorator/current-user.decorator";

@Controller("/relatorio")
export class RelatorioController {
    constructor(private relatorioService: RelatoriosService) {}

    @UseGuards(AuthGuard)
    @Get("/mensal/categoria")
    relatorioMensalByCategoria(
    @CurrentUser('sub') idUser: number, 
    @Query("idCategoria") idCategoria: number) {

        return this.relatorioService.gastoMensalByCategoria(+idUser, +idCategoria);
    }

    @UseGuards(AuthGuard)
    @Get("/mensal")
    relatorioMensal(
    @CurrentUser('sub') idUser: number) {

        return this.relatorioService.relatorioMensal(+idUser);
    }

}