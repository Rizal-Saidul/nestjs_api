import { Borrowing } from "src/borrowing/borrowing.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({default: 0})
    stock: number;

    @OneToMany(() => Borrowing, borrowing => borrowing.book)
    borrowings: Borrowing[]
}