import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book-dto';
import { UpdateBookDto } from './dtos/update-book-dto';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Post('create')
    create(
        @Body() createBookDto:CreateBookDto
    ) {
      return this.bookService.create(createBookDto)
    }

    @Get('find-all')
    findAll() {
        return this.bookService.findAll()
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
