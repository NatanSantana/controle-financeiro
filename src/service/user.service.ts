import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from '../dto/create-user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registrar(dto: CreateUser) {
    if (
      !dto.email.endsWith('@gmail.com') &&
      !dto.email.endsWith('@hotmail.com') &&
      !dto.email.endsWith('@outlook.com')
    ) {
      throw new BadRequestException('O formato de email não é válido');
    }

    if (await this.userRepository.findByEmail(dto.email)) {
      throw new ConflictException('A conta já existe');
    }

    const salt = genSaltSync(10);
    const senhaHashed = hashSync(dto.senha, salt);
    dto.senha = senhaHashed;

    await this.userRepository.registrarUser(dto);
  }

  async login(email: string, senha: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar um usuário');
    }

    const compare = compareSync(senha, user.senha);

    if (compare) {
      const payload = { sub: user.idUser, email: user.email };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async rendaMensal(idUser: number) {
    const rendaMensal = await this.userRepository.buscarRendaMensal(idUser);
    if (!rendaMensal) {
      throw new NotFoundException('Renda não encontrada');
    }

    return rendaMensal;
  }
}
