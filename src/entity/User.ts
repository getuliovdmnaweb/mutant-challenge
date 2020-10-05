import { Entity, PrimaryColumn, Column } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;
}
