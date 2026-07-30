import { Module } from '@nestjs/common';
import { EconomiaService } from '../service/economia.service';
import { EconomiaRepository } from '../repository/economia.repository';
import { UserRepository } from '../repository/user.repository';
import { EconomiaController } from '../controller/economias.controller';

@Module({
  imports: [],
  controllers: [EconomiaController],
  providers: [EconomiaService, EconomiaRepository, UserRepository],
})
export class EconomiaModule {}
