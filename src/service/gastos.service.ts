import { BadRequestException, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { CreateGasto } from "../dto/create-gasto.dto";
import { GastoRepository } from "../repository/gastos.repository";
import { UserRepository } from "../repository/user.repository";
import { CreateCategoria } from "../dto/create-categoria.dto";
import { CategoriaRepository } from "../repository/categoria.repository";

@Injectable()
export class GastosService {
    constructor(private gastosRepository: GastoRepository,
                private userRepository: UserRepository, 
                private categoriaRepository: CategoriaRepository
    ){}


    async registrarGasto(dto: CreateGasto) {
        if(dto.valor <= 0) {
            throw new BadRequestException("O valor do gasto não pode ser 0 ou menor")
        }
        
        if (!await this.userRepository.findById(dto.idUser)) {
            throw new NotFoundException("Não foi possível encontrar o usuário")
        }

        dto.dataCompra = new Date();

        return this.gastosRepository.registrarGasto(dto)

    }

    async gastosByIdUser(idUser: number) {
        const gastos = await this.gastosRepository.listarTodosGastosByIdUser(idUser);

        if (!gastos) {
            throw new NotFoundException("Não foi possível encontrar gastos com esse idUser")
        }

        return gastos;
    }

    async gastosByCategoria(idCategoria: number, idUser: number) {
        const gastos = await this.gastosRepository
                                .listarGastosByCategoria(idCategoria, idUser);

        if(!gastos) {
            throw new 
            NotFoundException("Não foi possível encontrar gastos relacionados a essa categoria")
        }

        return gastos;


    }

    async criarCategorias(dto: CreateCategoria) {
        const user = await this.userRepository.findById(dto.idUser);
            
        if (!user) {
            throw new NotFoundException("Não foi possível encontrar o usuário")
        }
        
        return await this.categoriaRepository.adicionarCategoria(dto);
 

    }



}