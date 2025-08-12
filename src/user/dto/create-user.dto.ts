import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { UserRole } from "../entities/user_entity"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsEnum(UserRole)
    @IsOptional()
    role:UserRole
}