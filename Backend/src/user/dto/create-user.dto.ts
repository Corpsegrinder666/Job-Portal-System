import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  otp: string;  

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}
