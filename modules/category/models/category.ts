import { IsString, MinLength } from 'class-validator';

export class Category {
  id?: string;

  @IsString()
  @MinLength(2, { message: 'Tên danh mục phải có ít nhất 2 ký tự.' })
  name: string = '';

  description?: string;
  budget?: number;
  remaining?: number;
  createdAt?: string;
}
