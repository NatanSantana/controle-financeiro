import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGasto } from '../dto/create-gasto.dto';
import { GastoRepository } from '../repository/gastos.repository';
import { UserRepository } from '../repository/user.repository';
import { CreateCategoria } from '../dto/create-categoria.dto';
import { CategoriaRepository } from '../repository/categoria.repository';
import { CreateGastoFixo } from '../dto/create-gastofixo.dto';
import { GastosFixosRepository } from '../repository/gastos-fixos.repository';
import { stringify } from 'node:querystring';
import { timeStamp } from 'node:console';

@Injectable()
export class GastosService {
  constructor(
    private gastosRepository: GastoRepository,
    private userRepository: UserRepository,
    private categoriaRepository: CategoriaRepository,
    private gastoFixoRepository: GastosFixosRepository,
  ) {}

  async registrarGasto(dto: CreateGasto) {
    if (dto.valor <= 0) {
      throw new BadRequestException('O valor do gasto não pode ser 0 ou menor');
    }

    if (!(await this.userRepository.findById(dto.idUser))) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }

    dto.dataCompra = new Date();

    return this.gastosRepository.registrarGasto(dto);
  }

  async gastosByIdUser(idUser: number) {
    const gastos =
      await this.gastosRepository.listarTodosGastosByIdUser(idUser);

    if (!gastos) {
      throw new NotFoundException(
        'Não foi possível encontrar gastos com esse idUser',
      );
    }

    return gastos;
  }

  async listarGastosPorMes(idUser: number, mes: string) {
    if (!mes) {
      throw new BadRequestException('O mês deve ser inserido');
    }

    const gastos = await this.gastosRepository.ListarGastosPorMes(idUser, mes);
    if (!gastos) {
      throw new NotFoundException(
        'Não foi possível encontrar gastos com esse idUser',
      );
    }

    return gastos;
  }

  async excluirGasto(idUser: number, idGastos: number) {
    try {
      if (!idUser || !idGastos) {
        throw new BadRequestException(
          'O idUser e o idGastos deve ser preenchdio',
        );
      }

      const gastoExcluido = await this.gastosRepository.excluirGasto(
        idUser,
        idGastos,
      );
      return gastoExcluido;
    } catch {
      throw new NotFoundException('Compra não encontrada');
    }
  }

  async excluirCategoria(idCategoria: number, idUser: number) {
    if (!idUser || !idCategoria) {
      throw new BadRequestException(
        'O idUser e o idCategoria deve ser preenchdio',
      );
    }

    const categoria =
      await this.categoriaRepository.deletarCategoriaByidCategoria(
        idCategoria,
        idUser,
      );

    return categoria;
  }

  async gastosByCategoria(idCategoria: number, idUser: number) {
    const gastos = await this.gastosRepository.listarGastosByCategoria(
      idCategoria,
      idUser,
    );

    if (!gastos) {
      throw new NotFoundException(
        'Não foi possível encontrar gastos relacionados a essa categoria',
      );
    }

    return gastos;
  }

  async excluirGastoFixo(id: number, idUser: number) {
    const excluido = await this.gastoFixoRepository.excluirGastoFixo(
      id,
      idUser,
    );

    if (!excluido) {
      throw new NotFoundException('Gasto fixo não encontrado');
    }

    return excluido;
  }

  async criarCategorias(dto: CreateCategoria) {
    const user = await this.userRepository.findById(dto.idUser);

    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }

    return await this.categoriaRepository.adicionarCategoria(dto);
  }

  async allCategoriasByUser(idUser) {
    const user = await this.userRepository.findById(idUser);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const categorias =
      await this.categoriaRepository.allCategoriasByUser(idUser);

    if (!categorias) {
      throw new NotFoundException('Não há categorias');
    }

    return categorias;
  }

  async adicionarGastoFixo(dto: CreateGastoFixo) {
    const user = await this.userRepository.findById(dto.idUser);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.valor <= 0) {
      throw new BadRequestException('O valor do gasto deve ser maior que 0');
    }

    return await this.gastoFixoRepository.adicionar(dto);
  }

  async listarGastosFixos(idUser: number) {
    const gastos =
      await this.gastoFixoRepository.listarGastosFixosByUser(idUser);
    if (!gastos) {
      throw new NotFoundException('Não encontrado nenhum dado');
    }

    return gastos;
  }
}
