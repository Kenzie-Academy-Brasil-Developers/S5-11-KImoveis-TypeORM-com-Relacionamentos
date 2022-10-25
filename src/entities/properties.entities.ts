import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Adress } from "./adresses.entities";
import { Categories } from "./categories.entities";
import { Schedules } from "./schedules.entities";

@Entity('propertiers')

export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column()
  value: number;
  
  @Column() 
  size: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;

  @OneToOne(() => Adress) @JoinColumn()
  address: Adress

  @ManyToOne(() => Categories, (category) => category.properties)
  category: Categories

  @OneToMany(() => Schedules, schedules => schedules.property)
  schedules: Schedules[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
};
