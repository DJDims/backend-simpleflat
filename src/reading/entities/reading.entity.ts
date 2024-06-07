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

    @Column()
    value: number;

    @ManyToOne(() => Counter, (counter) => counter.flat)
    @JoinColumn({ name: 'counterId' })
    counter: Counter;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
