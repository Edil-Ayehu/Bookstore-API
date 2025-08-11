import { Category } from "src/category/entities/category_entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['title', 'author']) // This enforces title+author combo uniqueness
export class Book {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string
    
    @Column()
    author:string

    @Column()
    description:string

    @Column('decimal')
    price:number

    @ManyToOne(()=> Category, (category)=> category.books, {eager: true})
    category: Category

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @DeleteDateColumn()
    DeletedAt:Date

}