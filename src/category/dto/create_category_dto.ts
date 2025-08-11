import { IsNotEmpty, IsString } from "class-validator"
import { Category } from "../entities/category_entity"
import { Unique } from "typeorm"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string
}