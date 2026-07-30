import { Module } from '@nestjs/common';
import { RelatorioController } from '../controller/relatorio.controller';
import { RelatoriosService } from '../service/relatorio.service';
import { RelatorioRepository } from '../repository/relatorio.repository';
import { UserRepository } from '../repository/user.repository';
import { CategoriaRepository } from '../repository/categoria.repository';

@Module({
  imports: [],
  controllers: [RelatorioController],
  providers: [
    RelatoriosService,
    RelatorioRepository,
    UserRepository,
    CategoriaRepository,
  ],
})
export class RelatorioModule {}
