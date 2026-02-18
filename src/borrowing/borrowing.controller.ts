import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BorrowBookDto } from './dto/borrowBook.dto';
import { BorrowingsService } from './borrowing.service';

@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingservice: BorrowingsService) {}

  @Post()
  borrowing(@Body() dto: BorrowBookDto) {
    this.borrowingservice.borrowingBook(dto.bookId, dto.userId);
  }

  @Patch(':id/return')
  returning(@Param('id', ParseIntPipe) id: number) {
    this.borrowingservice.returnedBook(id);
  }
}
