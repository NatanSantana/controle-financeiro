import { Body, Controller, Get, Post, Query, Delete, UseGuards } from "@nestjs/common";
import { CreateGasto } from "../dto/create-gasto.dto";
import { GastosService } from "../service/gastos.service";
import { CreateCategoria } from "../dto/create-categoria.dto";
import { CreateGastoFixo } from "../dto/create-gastofixo.dto";
import { AuthGuard } from "../security/auth.guard";

@Controller("/gastos")
export class GastosController {
    constructor(private gastoService: GastosService) {}

    @UseGuards(AuthGuard)
    @Post()
    async registrarGasto(@Body() dto: CreateGasto) {
        return this.gastoService.registrarGasto(dto);
    }

    @UseGuards(AuthGuard)
    @Get()
    async listarGastosByUser(@Query("idUser") idUser: number) {
        return this.gastoService.gastosByIdUser(+idUser);
    }

    @UseGuards(AuthGuard)
    @Post("/categoria")
    async adicionarCategoria(@Body() dto: CreateCategoria) {
        return this.gastoService.criarCategorias(dto)
    }

    @UseGuards(AuthGuard)
    @Get("/categoria")
    async listarByCategoria(
        @Query("idCategoria") idCategoria: number,
        @Query("idUser") idUser: number){

        return this.gastoService.gastosByCategoria(+idCategoria, +idUser);
    }

    @UseGuards(AuthGuard)
    @Post("/fixo")
    async adicionarGastoFixo(@Body() dto: CreateGastoFixo) {
        return this.gastoService.adicionarGastoFixo(dto);
    }

    @UseGuards(AuthGuard)
    @Get("/listar-categorias")
    async allCategoriasByUser(@Query("idUser") idUser: number) {
        return this.gastoService.allCategoriasByUser(+idUser);
    }

    @UseGuards(AuthGuard)
    @Get("/listar-gastosFixos")
    async listarGastoFixosByUser(@Query("idUser") idUser: number) {
        return await this.gastoService.listarGastosFixos(+idUser);
    }

    @UseGuards(AuthGuard)
    @Get("/listar-gastosMes")
    async listarGastosPorMes(@Query("idUser") idUser: number, @Query("mes") mes: string) {
        return this.gastoService.listarGastosPorMes(+idUser, mes);
    }

    @UseGuards(AuthGuard)
    @Delete("/deletarGasto")
    async deletarGasto(@Query("idUser") idUser: number, @Query("idGastos") idGastos: number) {
        return this.gastoService.excluirGasto(+idUser, +idGastos);
    }

    @UseGuards(AuthGuard)
    @Delete("/deletarCategoria")
    async deletarCategoria(@Query("idUser") idUser: number, @Query("idCategoria") idCategoria: number) {
        return this.gastoService.excluirCategoria(+idCategoria,+idUser);
    }

}