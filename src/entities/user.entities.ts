import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Schedules } from "./schedules.entities";
import { v4 as uuid } from "uuid";

@Entity()

export class User{
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 60 })
    name: string;

    @Column({ length: 60, unique: true })
    email: string;

    @Column({ length: 120 })
    @Exclude()
    password?: string;

    @Column()
    isAdm?: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean

    @OneToMany(() => Schedules, schedules => schedules.user)
    schedules: Schedules[]

    constructor(){
        if ( !this.id ) {
            this.id = uuid()
        }
    };
};