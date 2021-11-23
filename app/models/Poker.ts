import { Column, Entity, PrimaryColumn, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export default class Pocker extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public request_id!: number;
  
  @PrimaryColumn({ type: 'varchar' })
  public name: string;
  
  @Column({ type: 'varchar' })
  public hand: string;

  @CreateDateColumn()
  created_at!: string;

  constructor(request_id: number, name: string, hand: string) {
    super();
    this.request_id = request_id;
    this.name = name;
    this.hand = hand;
    this.name = name;
  }
}