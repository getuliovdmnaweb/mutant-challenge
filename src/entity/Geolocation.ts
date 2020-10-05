import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";

@Entity()
export class Geolocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @OneToOne((type) => Address)
  @JoinColumn()
  address: Address;
}
