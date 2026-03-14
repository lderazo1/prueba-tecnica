import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BusinessProcess } from './LogicaNegocio';

@Entity()
export class ProcessHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusinessProcess, p => p.history)
  @JoinColumn({ name: 'processId' })
  process: BusinessProcess;

  @Column()
  processId: number;

  @Column()
  action: string;

  @Column('jsonb')
  snapshot: object;

  @Column()
  hash: string;

  @Column({ nullable: true })
  previousHash: string;

  @CreateDateColumn()
  createdAt: Date;
}