import { Plano } from '../entidades/plano.entity';

export interface IRepPlanos {
  buscarTodos(): Promise<Plano[]>;
  buscarPorCodigo(codigo: number): Promise<Plano | null>;
  atualizar(plano: Plano): Promise<Plano>;
}
