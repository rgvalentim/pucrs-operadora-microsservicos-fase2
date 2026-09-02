/**
 * Caso de Uso (Use Case) - Aplicação
 *
 * Responsabilidade (SRP): Orquestrar a regra de negócio específica da aplicação.
 * Este caso de uso aplica a regra temporal de fidelidade (365 dias) ao instanciar
 * uma entidade pura de Domínio e, em seguida, utiliza a Inversão de Dependência (DIP)
 * para salvar os dados através da interface do repositório, sem acoplar a aplicação
 * ao TypeORM ou ao MySQL.
 */

import { Inject, Injectable } from '@nestjs/common';
import type { IRepAssinaturas } from '../dominio/repositorios/irep-assinaturas';
import { Assinatura } from '../dominio/entidades/assinatura.entity';
import { CriarAssinaturaDto } from '../interface/dtos/criar-assinatura.dto';

@Injectable()
export class CriarAssinaturaUc {
  constructor(
    @Inject('IRepAssinaturas')
    private readonly repAssinaturas: IRepAssinaturas,
  ) {}

  async executar(dados: CriarAssinaturaDto): Promise<Assinatura> {
    const dataAtual = new Date();

    // Calcula o fim da fidelidade adicionando 365 dias
    const dataFimFidelidade = new Date();
    dataFimFidelidade.setDate(dataAtual.getDate() + 365);

    // Cria a entidade pura do domínio
    const novaAssinatura = new Assinatura(
      dados.codPlano,
      dados.codCli,
      dataAtual, // início da fidelidade
      dataFimFidelidade, // fim da fidelidade
      dataAtual, // Data do último pagamento assume a data de criação
      dados.custoFinal,
      dados.descricao,
    );

    return await this.repAssinaturas.cadastrar(novaAssinatura);
  }
}
