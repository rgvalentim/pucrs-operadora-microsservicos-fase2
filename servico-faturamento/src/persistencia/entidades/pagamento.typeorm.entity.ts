import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pagamentos')
export class PagamentoTypeOrmEntity {
  @PrimaryGeneratedColumn()
  codigo!: number;

  @Column()
  dia!: number;

  @Column()
  mes!: number;

  @Column()
  ano!: number;

  @Column()
  codAss!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valorPago!: number;
}
