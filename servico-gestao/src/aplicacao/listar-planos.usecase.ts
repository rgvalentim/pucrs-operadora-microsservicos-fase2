import { Inject, Injectable } from '@nestjs/common';
import type { IRepPlanos } from '../dominio/repositorios/irep-planos';
import { Plano } from '../dominio/entidades/plano.entity';

@Injectable()
export class ListarPlanosUc {
  constructor(
    @Inject('IRepPlanos')
    private readonly repPlanos: IRepPlanos,
  ) {}

  async executar(): Promise<Plano[]> {
    return await this.repPlanos.buscarTodos();
  }
}
