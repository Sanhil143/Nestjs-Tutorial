import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Report{
  @PrimaryGeneratedColumn()
  reportId:number;

  @Column()
  price:number;
}