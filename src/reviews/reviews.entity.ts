import { PrimaryGeneratedColumn, Column } from 'typeorm';

export default class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string[];

  @Column()
  dimensions: number[] = [0, 0];
}
