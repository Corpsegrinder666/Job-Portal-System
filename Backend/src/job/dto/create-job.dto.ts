import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsString()
  @IsNotEmpty()
  company: string;
}
