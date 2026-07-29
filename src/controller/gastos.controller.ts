import { Body, Controller, Get, Post, Query, Delete } from "@nestjs/common";
import { CreateGasto } from "../dto/create-gasto.dto";
import { GastosService } from "../service/gastos.service";
import { CreateCategoria } from "../dto/create-categoria.dto";
import { CreateGastoFixo } from "../dto/create-gastofixo.dto";

@Controller("/gastos")
export class GastosController {
    constructor(private gastoService: GastosService) {}

    @Post()
    async registrarGasto(@Body() dto: CreateGasto) {
        return this.gastoService.registrarGasto(dto);
    }

    @Get()
    async listarGastosByUser(@Query("idUser") idUser: number) {
        return this.gastoService.gastosByIdUser(+idUser);
    }

    @Post("/categoria")
    async adicionarCategoria(@Body() dto: CreateCategoria) {
        return this.gastoService.criarCategorias(dto)
    }

    @Get("/categoria")
    async listarByCategoria(
        @Query("idCategoria") idCategoria: number,
        @Query("idUser") idUser: number){

        return this.gastoService.gastosByCategoria(+idCategoria, +idUser);
    }

    @Post("/fixo")
    async adicionarGastoFixo(@Body() dto: CreateGastoFixo) {
        return this.gastoService.adicionarGastoFixo(dto);
    }

    @Get("/listar-categorias")
    async allCategoriasByUser(@Query("idUser") idUser: number) {
        return this.gastoService.allCategoriasByUser(+idUser);
    }

    @Get("/listar-gastosFixos")
    async listarGastoFixosByUser(@Query("idUser") idUser: number) {
        return await this.gastoService.listarGastosFixos(+idUser);
    }

    @Get("/listar-gastosMes")
    async listarGastosPorMes(@Query("idUser") idUser: number, @Query("mes") mes: string) {
        return this.gastoService.listarGastosPorMes(+idUser, mes);
    }

    @Delete("/deletarGasto")
    async deletarGasto(@Query("idUser") idUser: number, @Query("idGastos") idGastos: number) {
        return this.gastoService.excluirGasto(+idUser, +idGastos);
    }

    @Delete("/deletarCategoria")
    async deletarCategoria(@Query("idUser") idUser: number, @Query("idCategoria") idCategoria: number) {
        return this.gastoService.excluirCategoria(+idCategoria,+idUser);
    }

}