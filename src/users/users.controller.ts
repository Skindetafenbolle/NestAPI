import { UsersService } from './users.service';
import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation( {summary: 'Создание пользователя'} )
    @ApiResponse( {status:200, type: User})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }


    @ApiOperation( {summary: 'Просмотр всех пользователей'} )
    @ApiResponse( {status:200, type: [User]})
    // @UseGuards(JwtAuthGuard)    //Block end-point
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation( {summary: 'Выдать роль'} )
    @ApiResponse( {status:200})
    // @UseGuards(JwtAuthGuard)    //Block end-point
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto:AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation( {summary: 'Забанить пользователя'} )
    @ApiResponse( {status:200})
    // @UseGuards(JwtAuthGuard)    //Block end-point
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto:BanUserDto) {
        return this.usersService.ban(dto);
    }
}
