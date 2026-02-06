import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;

    @IsInt()
    stock: number;
}