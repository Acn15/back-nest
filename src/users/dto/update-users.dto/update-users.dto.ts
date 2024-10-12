import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser um endereço válido' })
  email?: string;
}
