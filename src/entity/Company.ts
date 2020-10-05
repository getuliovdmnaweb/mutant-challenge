import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./Contact";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  catchPhrase: string;

  @Column()
  bs: string;

  @OneToOne((type) => Contact)
  @JoinColumn()
  contact: Contact;
}
