import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEconomia } from '../dto/create-economia.dto';
import { EconomiaRepository } from '../repository/economia.repository';
import { UserRepository } from '../repository/user.repository';
import { EconomiaModule } from '../module/economias.module';

@Injectable()
export class EconomiaService {
  constructor(
    private economiaRepository: EconomiaRepository,
    private userRepository: UserRepository,
  ) {}

  async guardarDinheiro(dto: CreateEconomia) {
    const isCadastrado = await this.economiaRepository.findByIdUser(dto.idUser);

    if (isCadastrado) {
      return await this.economiaRepository.aumentarValor(dto.idUser, dto.valor);
    }

    if (dto.valor <= 0) {
      throw new BadRequestException('O valor não pode ser negativo');
    }
    const user = await this.userRepository.findById(dto.idUser);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.economiaRepository.guardarDinheiro(dto);
  }

  async listarEconomiasByIdUser(idUser: number) {
    const user = await this.userRepository.findById(idUser);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.economiaRepository.listarEconomiasById(idUser);
  }

  async totalEconomizadoByIdUser(idUser: number) {
    const user = await this.userRepository.findById(idUser);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const economias = await this.economiaRepository.listarEconomiasById(idUser);

    return economias;
  }

  async aumentarValor(idUser: number, valorAumentar: number) {
    const valorAtualizado = await this.economiaRepository.aumentarValor(
      idUser,
      valorAumentar,
    );
    if (valorAtualizado) {
      throw new NotFoundException('Economia não encontrada');
    }
    return valorAtualizado;
  }

  async diminuirValor(idUser: number, valorDiminuir: number) {
    const diminuirValor = await this.economiaRepository.diminuirValor(
      idUser,
      valorDiminuir,
    );

    if (!diminuirValor) {
      throw new NotFoundException('Economia não encontrada');
    }

    return diminuirValor;
  }
}
