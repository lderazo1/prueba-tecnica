import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProcessHistory } from './Procesos';

@Entity()
export class BusinessProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  currentHash: string;

  @Column({ nullable: true })
  previousHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProcessHistory, h => h.process)
  history: ProcessHistory[];
}