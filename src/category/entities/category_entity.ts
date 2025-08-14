import { Book } from "src/book/entities/book_entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=> Book, (book)=> book.category)
    books: Book[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt:Date

    @DeleteDateColumn()
    deletedAt:Date
}