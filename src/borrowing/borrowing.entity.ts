import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.borrowings)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @Column({ type: 'timestamp' })
  borrowed_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  returned_at!: Date;

  @Column({ default: false })
  isReturned!: boolean;
}
