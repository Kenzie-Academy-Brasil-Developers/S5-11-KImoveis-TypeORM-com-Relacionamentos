import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Properties } from "./properties.entities";
import { v4 as uuid } from "uuid";
import { User } from "./user.entities";

@Entity("schedules")
class Schedules {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  hour: string;

  @ManyToOne(() => Properties ) 
  property: Properties

  @ManyToOne(() => User, (user) => user.schedules, { eager: true }) 
  user: User

  constructor(){
    if ( !this.id ) {
        this.id = uuid()
    }
};
}

export { Schedules };
