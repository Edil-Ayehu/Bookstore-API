import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class PaginationDto {
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @Min(0)
    page: number = 1

    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @Min(0)
    limit: number = 10

    @IsOptional()
    @IsString()
    name?:string // ✅ // filter category by name

    @IsOptional()
    @IsString()
    title?:string // ✅ // filter book by title

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    category?:number // ✅ // filter by category ID
}