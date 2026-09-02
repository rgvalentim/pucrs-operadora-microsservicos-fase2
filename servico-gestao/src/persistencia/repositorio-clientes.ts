import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IRepClientes } from '../dominio/repositorios/irep-clientes';
import { Cliente } from '../dominio/entidades/cliente.entity';
import { ClienteTypeOrmEntity } from './entidades/cliente.typeorm.entity';

@Injectable()
export class RepositorioClientes implements IRepClientes {
  constructor(
    @InjectRepository(ClienteTypeOrmEntity)
    private readonly clienteRep: Repository<ClienteTypeOrmEntity>,
  ) {}

  async buscarTodos(): Promise<Cliente[]> {
    const clientesTypeOrm = await this.clienteRep.find();
    return clientesTypeOrm.map((clienteOrm) =>
      this.mapearParaDominio(clienteOrm),
    );
  }

  async buscarPorCodigo(codigo: number): Promise<Cliente | null> {
    const clienteTypeOrm = await this.clienteRep.findOneBy({ codigo });
    if (!clienteTypeOrm) return null;
    return this.mapearParaDominio(clienteTypeOrm);
  }

  // Tradutor entre o banco (TypeORM) e o domínio puro
  private mapearParaDominio(clienteOrm: ClienteTypeOrmEntity): Cliente {
    return new Cliente(clienteOrm.nome, clienteOrm.email, clienteOrm.codigo);
  }
}
