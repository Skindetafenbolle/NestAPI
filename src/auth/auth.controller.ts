import { AuthService } from './auth.service';
import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
