import { Type } from "class-transformer"
import { IsNumber, IsPositive, Min } from "class-validator"

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
}