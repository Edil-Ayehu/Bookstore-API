import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    @Exclude() // hides password from API response
    password:string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role:UserRole

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}