import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateGasto } from "../dto/create-gasto.dto";
import { GastoRepository } from "../repository/gastos.repository";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class GastosService {
    constructor(private gastosRepository: GastoRepository,
                private userRepository: UserRepository
    ){}


    async registrarGasto(dto: CreateGasto) {
        if(dto.valor <= 0) {
            throw new BadRequestException("O valor do gasto não pode ser 0 ou menor")
        }
        
        if (!await this.userRepository.findById(dto.idUser)) {
            throw new NotFoundException("Não foi possível encontrar o usuário")
        }

        return this.gastosRepository.registrarGasto(dto)



    }

}