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
    @UseGuards(RolesGuard) // ✅ Role check
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
    async findOne(@Param('id', ParseIntPipe) id:number) {
        const book = await this.bookService.findOne(id)
        return new ResponseDto(book, 'Book fetched successfully!')
    }

    @Patch(':id')
    @UseGuards(RolesGuard) // ✅ Role check
    @Roles(UserRole.ADMIN)                   // ✅ Only admins allowed
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto:UpdateBookDto,
    ){
        const result = await this.bookService.update(id,updateBookDto)
        return new ResponseDto(result, "Book updated Successfully!")
    }

    @Delete(':id')
    @UseGuards(RolesGuard) // ✅ Role check
    @Roles(UserRole.ADMIN)                   // ✅ Only admins allowed
    async remove(@Param('id', ParseIntPipe) id:number) {
        const result = await this.bookService.remove(id)
        return new ResponseDto(result, "Book Deleted Successfully!")
    }
}
