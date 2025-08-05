import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @DeleteDateColumn()
    DeletedAt:Date

}