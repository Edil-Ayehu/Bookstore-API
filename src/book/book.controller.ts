import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book-dto';
import { UpdateBookDto } from './dtos/update-book-dto';
import { ResponseDto } from 'src/common/dto/response-dto';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Post('create')
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
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto:UpdateBookDto,
    ){
        return this.bookService.update(id,updateBookDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number) {
        return this.bookService.remove(id)
    }
}
