import { Flat } from 'src/flat/entities/flat.entity';
import { House } from 'src/house/entities/house.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum Status {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => House, (house) => house.owner)
    houses: House[];

    @OneToMany(() => Flat, (flat) => flat.user)
    flat: Flat[];

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
    })
    status: Status;

    @Column()
    token: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
