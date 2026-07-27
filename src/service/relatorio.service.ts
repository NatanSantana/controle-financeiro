import { NotFoundError } from "rxjs";
import { RelatorioRepository } from "../repository/relatorio.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { CategoriaRepository } from "../repository/categoria.repository";
import { Decimal } from "@prisma/client/runtime/client";

@Injectable()
export class RelatoriosService {
    constructor(
        private relatorioRepository: RelatorioRepository, 
        private userRepository: UserRepository,
        private categoriaRepository: CategoriaRepository) {}

    async gastoMensalByCategoria(idUser: number, idCategoria: number) {
        try {

        
        const [user, categoria] = await Promise.all([
            this.userRepository.findById(idUser), 
            this.categoriaRepository.findById(idCategoria)])

            if(!user){
                throw new NotFoundException("O usuário não foi encontrado")
            }

            if(!categoria) {
                throw new NotFoundException("Não foi possível encontrar a categoria")
            }



        const relatorio = await this.relatorioRepository.gastoMensalByCategoria(idUser, idCategoria);
        if (!relatorio) {
            throw new NotFoundException("Não há dados para retornar o relatório do mês")
        }

        const valorTotal = Decimal.sum(...relatorio.map((i) => i.valor));


        const resultado = {
            totalGasto: valorTotal,
            categoria: relatorio[0].categoriaGasto?.nome
        }

        return resultado

    } catch {
        throw new Error("Erro")
    }
    }

    async relatorioMensal(idUser: number) {
        const user = await this.userRepository.findById(idUser);

        if(!user) {
            throw new NotFoundException("Não foi possível encontrar um usuário com esse ID")
        }

        const relatorio = await this.relatorioRepository.relatorioMensal(idUser);

        if(!relatorio) {
            throw new NotFoundException("Sem dados para relatorio")
        }

        return relatorio;




    }


}