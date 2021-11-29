import { Column, Entity, PrimaryColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poker {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public request_id!: string;
  
  @Column({ type: 'varchar' })
  public result!: string;
  
  @PrimaryColumn({ type: 'varchar' })
  public hand!: string;

  @CreateDateColumn()
  timestamp!: string;
}