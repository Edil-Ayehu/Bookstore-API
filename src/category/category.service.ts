import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Category } from './entities/category_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create_category_dto';
import { UpdateCategoryDto } from './dto/update_category_dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async create(createCategoryDto:CreateCategoryDto) {
        const exists = await this.categoryRepository.findOne({
            where: {name: createCategoryDto.name},
            withDeleted: false
        });

        if(exists) throw new BadRequestException(`Category ${createCategoryDto.name} Already Exist`);

        return await this.categoryRepository.save(createCategoryDto);
    }

    async findAll(paginationDto: PaginationDto) {
        const {page, limit, name} = paginationDto;

        const where = name 
        ? { name: ILike(`%${name}%`) } // partial match on category name
        : {};

        const [data, total] = await this.categoryRepository.findAndCount({
            where,
            skip: (page -1) * limit,
            take: limit,
            order: { createdAt: 'DESC'}
        });

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }

    async findOne(id:number) {
        const category = await this.categoryRepository.findOne({where: {id}, relations: ['books']})
        if(!category) throw new NotFoundException("Category Not Found!")
        return category;
    }

    async update(id:number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.findOne(id)
        const updatedCategory = Object.assign(category, updateCategoryDto)
        return this.categoryRepository.save(updatedCategory);
    }

    async remove(id:number) {
       const category = await this.findOne(id)
        if(!category) throw new NotFoundException("Category Not Found!")
        this.categoryRepository.softDelete(id)

        return {
            deleted: true,
            id,
        }
    }
}
