import { IsNotEmpty, IsOptional, IsString, NotEquals } from "class-validator";

export class UpdateUserDto {
  @NotEquals(null)
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  surname: string | null;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsString()
  phone: string | null;
}
