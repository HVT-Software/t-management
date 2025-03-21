import { IsUUID, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class Category {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  budget!: number;

  @IsDate()
  @Type(() => Date)
  createAt!: Date;

  @IsUUID()
  id!: string;
}
