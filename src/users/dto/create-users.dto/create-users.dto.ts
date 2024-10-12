import {
  IsString,
  IsEmail,
  IsNotEmpty,
  // IsInt,
  // IsUUID,
  //   MinLength,
  //   Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O documento do usuário é obrigatório' })
  document: string;

  @IsNotEmpty({ message: 'O email do usuário é obrigatório' })
  @IsEmail({}, { message: 'O email deve ser um endereço válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha do usuário é obrigatória' })
  //   @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  //   @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  //     message:
  //       'A senha deve conter pelo menos uma letra, um número e um caractere especial',
  //   })
  password: string;
}
