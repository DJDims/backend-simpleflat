import { Flat } from 'src/flat/entities/flat.entity';
import { House } from 'src/house/entities/house.entity';
import { ERole, EStatus } from 'src/types/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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
        enum: EStatus,
        default: EStatus.PENDING,
    })
    status: EStatus;

    @Column({
        type: 'enum',
        enum: ERole,
        default: ERole.USER,
    })
    role: ERole;

    @Column()
    token: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
