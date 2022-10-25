import { Entity, Column, PrimaryColumn  } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('address')

export class Adress {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 120 })
    district: string;

    @Column({ length: 60 })
    zipCode: string;

    @Column()
    number: string;

    @Column({ length: 60 })
    city: string;

    @Column({ length: 60 })
    state: string;

    constructor(){
        if ( !this.id ) {
            this.id = uuid()
        }
    };
};