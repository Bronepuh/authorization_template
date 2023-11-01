import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Max } from 'class-validator';
import { OrderTypes } from 'src/@common/enums/typeorm.enum';

export class GetUsersDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'id';

  @IsOptional()
  @IsEnum(OrderTypes)
  sortType?: OrderTypes = OrderTypes.ASC;
}
