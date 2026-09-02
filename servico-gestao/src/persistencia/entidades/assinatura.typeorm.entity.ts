import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assinaturas')
export class AssinaturaTypeOrmEntity {
  //as exclamações no nome das propriedades é para avisar ao compilador que essa variável será preenchida pelo ORM antes de ser lida.
  @PrimaryGeneratedColumn()
  codigo!: number;

  @Column({ type: 'int' })
  codPlano!: number;

  @Column({ type: 'int' })
  codCli!: number;

  @Column({ type: 'date' })
  inicioFidelidade!: Date;

  @Column({ type: 'date' })
  fimFidelidade!: Date;

  @Column({ type: 'date' })
  dataUltimoPagamento!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custoFinal!: number;

  @Column({ type: 'text' })
  descricao!: string;
}
