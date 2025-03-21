import { IsUUID, IsNumber, IsString, IsDate, ValidateNested, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { Category } from "./category";

export enum TransactionType {
  INCOME,
  EXPENSE
}

export class Transaction {
  @IsUUID()
  userId!: string;

  @IsUUID()
  categoryId!: string;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsNumber()
  amount!: number;

  @IsString()
  description!: string;

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  @ValidateNested()
  @Type(() => Category)
  category!: Category;
}
