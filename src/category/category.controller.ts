import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create_category_dto';
import { UpdateCategoryDto } from './dto/update_category_dto';
import { RolesGuard } from 'src/auth/roles_guard';
import { Roles } from 'src/auth/roles_decorator';
import { UserRole } from 'src/user/entities/user_entity';
import { ResponseDto } from 'src/common/dto/response-dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}
   
    @Post('create')
    @UseGuards(RolesGuard) // ✅ Role check
    @Roles(UserRole.ADMIN) // ✅ Only admins allowed
    async create(@Body() createCategoryDto:CreateCategoryDto) {
        const result = await this.categoryService.create(createCategoryDto)
        return new ResponseDto(result, "Category created successfully!")
    }

    @Get()
    async findAll(
        @Query() paginationDto: PaginationDto,
        @Query('name') name?:string,
    ) {
        const books = await this.categoryService.findAll(paginationDto, name)
        return new ResponseDto(books, "Books fetched successfully!")
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const category = await this.categoryService.findOne(id)
        return new ResponseDto(category,"Category fetched successfully!")
    }

    @Patch(':id')
    @UseGuards(RolesGuard) // ✅ Role check
    @Roles(UserRole.ADMIN) // ✅ Only admins allowed
    async update(@Param('id', ParseIntPipe)id :number, @Body() updateCategoryDto:UpdateCategoryDto) {
        const result = await this.categoryService.update(id, updateCategoryDto)
        return new ResponseDto(result, 'Category updated Successfully!')
    }

    @Delete(':id')
    @UseGuards(RolesGuard) // ✅ Role check
    @Roles(UserRole.ADMIN) // ✅ Only admins allowed
    async remove(@Param('id', ParseIntPipe) id:number) {
        const result = await this.categoryService.remove(id)
        return new ResponseDto(result, 'Category Deleted Successfully!')
    }
}
