import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserModule } from './module/user.module';
import { ConfigModule } from '@nestjs/config';
import { GastosModule } from './module/gastos.module';
import { RelatorioModule } from './module/relatorio.module';
import { EconomiaModule } from './module/economias.module';

@Module({
  imports: [AuthModule, UserModule, GastosModule, RelatorioModule, EconomiaModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
