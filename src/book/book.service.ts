import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Book } from './entities/book_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dtos/create-book-dto';
import { UpdateBookDto } from './dtos/update-book-dto';
import { Category } from 'src/category/entities/category_entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

    async findAll(paginationDto:PaginationDto) {
      const {page, limit,title, category} = paginationDto;

      // Build dynamic where conditions
      const where: any = {};

      if(title) {
        where.title = ILike(`%${title}`); // case-insensitive partial match
      }

      if(category) {
        where.category = {id: category} // filter by category ID
      }

        const [docs, total] = await this.bookrepo.findAndCount({
          where,
          skip: (page - 1) * limit,
          take: limit,
          order: {createdAt: 'DESC'}
        });

        return {
          docs,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
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
