import { Module } from '@nestjs/common';
import { BorrowingsController } from './borrowing.controller';
import { BorrowingsService } from './borrowing.service';

@Module({
  controllers: [BorrowingsController],
  providers: [BorrowingsService]
})
export class BorrowingsModule {}
