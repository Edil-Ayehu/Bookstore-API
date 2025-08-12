import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './entities/book_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dtos/create-book-dto';
import { UpdateBookDto } from './dtos/update-book-dto';
import { Category } from 'src/category/entities/category_entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookrepo: Repository<Book>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async create(createBookDto:CreateBookDto) {
      const category = await this.categoryRepository.findOne({where: {id: createBookDto.categoryId}})
      if(!category) throw new BadRequestException("Invalid Category ID!")
        
    // Check if a book with the same title and author exists
    const existing = await this.bookrepo.findOne({
      where: { title: createBookDto.title, author: createBookDto.author },
      withDeleted: false, // Ignores soft-deleted entries
    });

    if (existing) {
      throw new BadRequestException(
        `Book titled "${createBookDto.title}" by "${createBookDto.author}" already exists.`,
      );
    }
       const newBook = this.bookrepo.create({...createBookDto, category})
       return this.bookrepo.save(newBook)
    }

    findAll() {
        return this.bookrepo.find()
    }

    async findOne(id:number) {
        const book = await this.bookrepo.findOne({where: {id}})
        if(!book) throw new NotFoundException(`Book with id ${id} not found`);

        return book
    }

    async update(id:number, updateBookDto:UpdateBookDto) {
        const book = await this.bookrepo.findOne({where: {id}})
        if(!book) throw new NotFoundException(`Book with id ${id} not found`);

        const updatedBook = Object.assign(book,updateBookDto)
        return this.bookrepo.save(updatedBook)
    }

    async remove(id: number) {
        const book = await this.findOne(id)
        await this.bookrepo.softDelete(id)

        return {
          deleted: true,
          id,
        }
    }
}
