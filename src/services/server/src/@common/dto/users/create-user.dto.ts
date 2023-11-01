import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsString()
  surname: string | null;

  @IsOptional()
  @IsString()
  phone: string | null;

  // @IsOptional()
  // @IsString()
  // roleIds?: string | null;
}
