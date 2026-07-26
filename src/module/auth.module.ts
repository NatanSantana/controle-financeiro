import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/user.repository";



@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [UserService, UserRepository],
  controllers: [],
  exports: [UserService],
})
export class AuthModule {}