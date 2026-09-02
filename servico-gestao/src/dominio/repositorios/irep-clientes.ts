import { Cliente } from '../entidades/cliente.entity';

export interface IRepClientes {
  buscarTodos(): Promise<Cliente[]>;
  buscarPorCodigo(codigo: number): Promise<Cliente | null>;
}
