import { Column, Entity, PrimaryColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poker {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public request_id!: string;
  
  @PrimaryColumn({ type: 'varchar' })
  public result!: string;
  
  @Column({ type: 'varchar' })
  public hand!: string;

  @CreateDateColumn()
  timestamp!: string;

  // constructor(request_id: string, hand: string, result: string,) {
  //   this.request_id = request_id;
  //   this.hand = hand;
  //   this.result = result;
  // }
}