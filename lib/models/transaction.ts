import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { Category } from "./category";

export enum TransactionType {
  INCOME,
  EXPENSE
}

export class Transaction {
  id: string = "";

  userId: string = "";
  categoryId: string = "";

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.INCOME;

  @IsNumber()
  amount: number = 0;

  @IsString()
  description: string = "";

  @IsDate()
  @Type(() => Date)
  date: Date = new Date();

  @IsDate()
  @Type(() => Date)
  createdAt: Date = new Date();

  @ValidateNested()
  @Type(() => Category)
  category: Category = new Category();
}
