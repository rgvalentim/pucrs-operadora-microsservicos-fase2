import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planos')
export class PlanoTypeOrmEntity {
  @PrimaryGeneratedColumn()
  //as exclamações no nome das propriedades é para avisar ao compilador que essa variável será preenchida pelo ORM antes de ser lida.
  codigo!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custoMensal!: number;

  @Column({ type: 'date' })
  data!: Date;

  @Column({ type: 'text' })
  descricao!: string;
}
