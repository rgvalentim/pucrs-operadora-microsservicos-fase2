import { Inject, Injectable } from '@nestjs/common';
import type { IRepClientes } from '../dominio/repositorios/irep-clientes';
import { Cliente } from '../dominio/entidades/cliente.entity';

@Injectable()
export class ListarClientesUc {
  constructor(
    // Utilizamos o @Inject com uma string porque interfaces TypeScript
    // desaparecem em tempo de execução, então o NestJS precisa de um "token"
    @Inject('IRepClientes')
    private readonly repClientes: IRepClientes,
  ) {}

  async executar(): Promise<Cliente[]> {
    return await this.repClientes.buscarTodos();
  }
}
