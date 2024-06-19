import { City } from 'src/city/entities/city.entity';
import { Flat } from 'src/flat/entities/flat.entity';
import { EStatus } from 'src/types/types';
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

@Entity({ name: 'houses' })
export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    houseNumber: number;

    @Column()
    zip: number;

    @ManyToOne(() => User, (user) => user.houses)
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => Flat, (flat) => flat.house)
    flats: Flat[];

    @ManyToOne(() => City, (city) => city.houses)
    @JoinColumn({ name: 'cityId' })
    city: City;

    @Column({
        type: 'enum',
        enum: EStatus,
        default: EStatus.PENDING,
    })
    status: EStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
