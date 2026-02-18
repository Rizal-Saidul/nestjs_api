import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Borrowing } from './borrowing.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BorrowingsService {
  constructor(@InjectRepository(Borrowing)
  private readonly borrowingRepository: Repository<Borrowing>) {}

  // boroowing
  async borrowingBook(bookId: number, userId: number): Promise<void> {
    const book = await this.borrowingRepository.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException('book id is not found');
    }

    if (book.book.stock <= 0) {
      throw new BadRequestException('book out of stock');
    }

    const user = await this.borrowingRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    book.book.stock -= 1;
    await this.borrowingRepository.save(book);

    const borrowing = this.borrowingRepository.create({
      user,
      book,
      borrowed_at: new Date(),
    });

    this.borrowingRepository.save(borrowing);
  }

  // return
  async returnedBook(borrowingId: number): Promise<Borrowing> {
    const borrowing = await this.borrowingRepository.findOne({
      where: { id: borrowingId },
      relations: ['book'],
    });

    if (!borrowing) {
      throw new NotFoundException(' borrowing  id is not found');
    }

    if (borrowing.isReturned) {
      throw new BadRequestException(' boorrowing  is  returned');
    }

    borrowing.book.stock += 1;
    await this.borrowingRepository.save(borrowing.book);

    borrowing.isReturned = true;
    borrowing.returned_at = new Date();

    return this.borrowingRepository.save(borrowing);
  }
}
