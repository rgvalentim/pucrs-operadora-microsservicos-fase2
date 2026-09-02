import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clientes')
export class ClienteTypeOrmEntity {
  @PrimaryGeneratedColumn()
  //as exclamações no nome das propriedades é para avisar ao compilador que essa variável será preenchida pelo ORM antes de ser lida.
  codigo!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;
}
