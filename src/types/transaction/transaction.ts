import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, MaxLength, Min, ValidateNested } from "class-validator";
import { Category } from "../category/category";
import { ETransactionType } from "./transaction-type";

export class Transaction {
  id: string = "";

  userId?: string;

  @IsEnum(ETransactionType)
  type!: ETransactionType;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0.01, { message: "Số tiền phải lớn hơn 0" })
  amount!: number;

  categoryId?: string;

  @MaxLength(2000, { message: "Tối đa 2000 ký tự" })
  description?: string;

  @IsDate()
  @Type(() => Date)
  date: Date = new Date();

  @ValidateNested()
  @Type(() => Category)
  category?: Category | null;
}
