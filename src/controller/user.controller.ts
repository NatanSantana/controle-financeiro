import { Body, Controller, Post } from "@nestjs/common";
import { CreateUser } from "../dto/create-user.dto";
import { UserService } from "../service/user.service";

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

}