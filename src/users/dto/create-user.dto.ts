import { ApiProperty } from "@nestjs/swagger/dist";
import { IsEmail, IsString,Length } from "class-validator";


export class CreateUserDto{

    @ApiProperty( { example: 'user email', description: 'Почтовый адрес' } )
    @IsString({message:"Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @IsString({message:"Должно быть строкой"})
    @ApiProperty( { example: 'user password', description: 'Пароль' } )
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}