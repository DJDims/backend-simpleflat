import { Counter } from 'src/counter/entities/counter.entity';
import { House } from 'src/house/entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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

@Entity({ name: 'flats' })
export class Flat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.flat)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => House, (house) => house.flats)
    @JoinColumn({ name: 'houseId' })
    house: House;

    @OneToMany(() => Counter, (counter) => counter.flat)
    counters: Counter[];

    @Column()
    flatNumber: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
    })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
