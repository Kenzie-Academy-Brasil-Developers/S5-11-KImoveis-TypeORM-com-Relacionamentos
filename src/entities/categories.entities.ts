import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entities";

@Entity('categories')

export class Categories {
    
        @PrimaryColumn('uuid')
        id: string;

        @Column({ length: 60, unique: true })
        name: string;
        
        @OneToMany(() => Properties, (propertiers) => propertiers.category)
        properties: Properties[]
    
        constructor(){
            if ( !this.id ) {
                this.id = uuid()
            }
        };
};