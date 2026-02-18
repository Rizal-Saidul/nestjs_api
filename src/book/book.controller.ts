import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/createBook.dto';
import { AddStockDto } from './dto/addStockDto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  getBook() {
    return this.bookService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Put(':id')
  addStock(@Param('id') id: number, @Body() dto: AddStockDto) {
    return this.bookService.addStockBook(+id, dto.quantity);
  }
}
