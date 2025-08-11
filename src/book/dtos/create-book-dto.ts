import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsNotEmpty()
    author:string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsNumber()
    categoryId:number

    @IsNumber()
    @IsNotEmpty()
    price:number
}