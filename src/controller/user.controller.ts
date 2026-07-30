import { Body, Controller, Post, Query, Get, UseGuards } from "@nestjs/common";
import { CreateUser } from "../dto/create-user.dto";
import { UserService } from "../service/user.service";
import { CurrentUser } from "../decorator/current-user.decorator";
import { AuthGuard } from "../security/auth.guard";

@Controller("/user")
export class UserController {
    constructor(private userService: UserService){}


    @Post("/registrar")
    async registrarUser(@Body() dto: CreateUser) {
        return this.userService.registrar(dto);   
    }

    @Post("/login")
    async login(@Body() body: {email: string, senha: string}) {
        return this.userService.login(body.email, body.senha);
    }

    @UseGuards(AuthGuard)
    @Get("/rendaMensal")
    async rendaMensal(@CurrentUser('sub') idUser: number) {
        return this.userService.rendaMensal(+idUser);
    }

}