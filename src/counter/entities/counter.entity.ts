import { Flat } from 'src/flat/entities/flat.entity';
import { Reading } from 'src/reading/entities/reading.entity';
import { ECounterType } from 'src/types/types';
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

@Entity({ name: 'counters' })
export class Counter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Flat, (flat) => flat.counters)
    @JoinColumn({ name: 'flatId' })
    flat: Flat;

    @OneToMany(() => Reading, (reading) => reading.counter)
    readings: Reading[];

    @Column({
        type: 'enum',
        enum: ECounterType,
    })
    counterType: ECounterType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
