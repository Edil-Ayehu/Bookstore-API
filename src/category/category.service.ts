import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create_category_dto';
import { UpdateCategoryDto } from './dto/update_category_dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async create(createCategoryDto:CreateCategoryDto) {
        const exists = await this.categoryRepository.findOne({where: {name: createCategoryDto.name}});

        if(exists) throw new BadRequestException(`Category ${createCategoryDto.name} Already Exist`);

        return await this.categoryRepository.save(createCategoryDto);
    }

    findAll() {
        return this.categoryRepository.find({relations: ['books']})
    }

    async findOne(id:number) {
        const category = await this.categoryRepository.findOne({where: {id}, relations: ['books']})
        if(!category) throw new NotFoundException("Category Not Found!")
        return category;
    }

    update(id:number, updateCategoryDto: UpdateCategoryDto) {
        const category = this.findOne(id)
        const updatedCategory = Object.assign(category, updateCategoryDto)
        return updatedCategory;
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
