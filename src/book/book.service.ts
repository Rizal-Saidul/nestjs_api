import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // create book
  async createBook(bookData: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(bookData);
    return this.bookRepository.save(book);
  }

  // add book
  async addStockBook(id: number, quantity: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('book not found');
    }
    book.stock += quantity;
    return this.bookRepository.save(book);
  }

  // find All
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['book'],
      order: { stock: 'DESC' },
    });
  }

  // find One
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }

  // find By title

  // find By author
}
