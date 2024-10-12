import { Exclude } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'O CPF deve conter apenas números' })
  document: string;

  @Column()
  @Exclude()
  @IsString()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
