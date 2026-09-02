import { Inject, Injectable } from '@nestjs/common';
import type { IRepPlanos } from '../dominio/repositorios/irep-planos';
import { Plano } from '../dominio/entidades/plano.entity';
import { AtualizarCustoPlanoDto } from '../interface/dtos/atualizar-custo-plano.dto';

@Injectable()
export class AtualizarCustoPlanoUc {
  constructor(
    @Inject('IRepPlanos')
    private readonly repPlanos: IRepPlanos,
  ) {}

  async executar(
    idPlano: number,
    dados: AtualizarCustoPlanoDto,
  ): Promise<Plano> {
    // 1. Busca a entidade de domínio atual
    const planoExistente = await this.repPlanos.buscarPorCodigo(idPlano);

    if (!planoExistente) {
      throw new Error('Plano não encontrado.');
    }

    // 2. Aplica as regras de negócio de atualização
    planoExistente.custoMensal = dados.custoMensal;
    planoExistente.data = new Date(); // Atualiza para a data da modificação atual

    // 3. Persiste a entidade alterada
    return await this.repPlanos.atualizar(planoExistente);
  }
}
