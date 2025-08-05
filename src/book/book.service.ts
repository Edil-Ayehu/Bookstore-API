import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './entities/book_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dtos/create-book-dto';
import { UpdateBookDto } from './dtos/update-book-dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly repo: Repository<Book>
    ) {}

    create(createBookDto:CreateBookDto) {
       const newBook = this.repo.create(createBookDto)
       return this.repo.save(newBook)
    }

    findAll() {
        return this.repo.find()
    }

    findOne(id:number) {
        const book = this.repo.findOne({where: {id}})
        if(!book) throw new NotFoundException(`Book with id ${id} not found`);

        return book
    }

    async update(id:number, updateBookDto:UpdateBookDto) {
        const book = this.repo.findOne({where: {id}})
        if(!book) throw new NotFoundException(`Book with id ${id} not found`);

        const updatedBook = Object.assign(book,updateBookDto)
        return this.repo.save(updatedBook)
    }

    remove(id: number) {
        const book = this.findOne(id)
        return this.repo.softDelete(id)
    }
}
