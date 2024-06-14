import { Counter } from 'src/counter/entities/counter.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'readings' })
export class Reading {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 8, scale: 3 })
    value: number;

    @ManyToOne(() => Counter, (counter) => counter.readings)
    @JoinColumn({ name: 'counterId' })
    counter: Counter;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
