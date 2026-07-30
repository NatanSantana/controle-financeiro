import { Post, UseGuards, Get, Controller, Body, Patch, Query } from "@nestjs/common";
import { CreateEconomia } from "../dto/create-economia.dto";
import { EconomiaService } from "../service/economia.service";
import { AuthGuard } from "../security/auth.guard";
import { CurrentUser } from "../decorator/current-user.decorator";

@Controller("/economias")
export class EconomiaController {
    constructor(private economiaService: EconomiaService) {}

    @UseGuards(AuthGuard)
    @Post("/guardar")
    guardarDinheiro(@Body() dto: CreateEconomia) {
        return this.economiaService.guardarDinheiro(dto);
    }

    @UseGuards(AuthGuard)
    @Get("/all")
    listarEconomiasByIdUser(@CurrentUser('sub') idUser: number) {
        return this.economiaService.listarEconomiasByIdUser(+idUser);
    }

    @UseGuards(AuthGuard)
    @Get("/total")
    totalEconomizadoByUser(@CurrentUser('sub') idUser: number) {
        return this.economiaService.totalEconomizadoByIdUser(+idUser);
    }

    @UseGuards(AuthGuard)
    @Patch("/aumentar")
    aumentarValor(@CurrentUser('sub') idUser: number, @Query('valorAumentar') valorAumentar: number) {
        return this.economiaService.aumentarValor(idUser, valorAumentar)
    }

    @UseGuards(AuthGuard)
    @Patch("/diminuir")
    diminuirValor(@CurrentUser('sub') idUser: number, @Query('valorDiminuir') valorDiminuir: number) {
        return this.economiaService.diminuirValor(idUser, valorDiminuir)
    }
}


