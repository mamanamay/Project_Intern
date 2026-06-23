import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-json', default: {} })
  data: any;

  @UpdateDateColumn()
  updatedAt: Date;
}
