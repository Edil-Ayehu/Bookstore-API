import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book-dto';
import { UpdateBookDto } from './dtos/update-book-dto';
import { ResponseDto } from 'src/common/dto/response-dto';
import { RolesGuard } from 'src/auth/roles_guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles_decorator';
import { UserRole } from 'src/user/entities/user_entity';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Post('create')
    @UseGuards(RolesGuard) // ✅ Require JWT + role check
    @Roles(UserRole.ADMIN)                   // ✅ Only admins allowed
    async create(
        @Body() createBookDto:CreateBookDto
    ) {
      const book = await this.bookService.create(createBookDto)
      return new ResponseDto(book, "Book created successfully")
    }

    @Get('find-all')
    async findAll() {
        const books = await this.bookService.findAll()
        return new ResponseDto(books, "Books fetched successfully.")
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number) {
        return this.bookService.findOne(id)
    }

    @Patch(':id')
    @UseGuards(RolesGuard) // ✅ Require JWT + role check
    @Roles(UserRole.ADMIN)                   // ✅ Only admins allowed
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto:UpdateBookDto,
    ){
        return this.bookService.update(id,updateBookDto)
    }

    @Delete(':id')
    @UseGuards(RolesGuard) // ✅ Require JWT + role check
    @Roles(UserRole.ADMIN)                   // ✅ Only admins allowed
    remove(@Param('id', ParseIntPipe) id:number) {
        return this.bookService.remove(id)
    }
}
