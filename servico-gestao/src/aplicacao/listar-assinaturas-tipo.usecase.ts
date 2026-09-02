import { Inject, Injectable } from '@nestjs/common';
import type { IRepAssinaturas } from '../dominio/repositorios/irep-assinaturas';
import { Assinatura } from '../dominio/entidades/assinatura.entity';
import { AssinaturaRespostaDto } from '../interface/dtos/assinatura-resposta.dto';

@Injectable()
export class ListarAssinaturasTipoUc {
  constructor(
    @Inject('IRepAssinaturas')
    private readonly repAssinaturas: IRepAssinaturas,
  ) {}

  async executar(tipo: string): Promise<AssinaturaRespostaDto[]> {
    let assinaturasDominio: Assinatura[] = [];
    const tipoNormalizado = tipo.toUpperCase();

    if (tipoNormalizado === 'ATIVOS') {
      assinaturasDominio = await this.repAssinaturas.buscarAtivas();
    } else if (tipoNormalizado === 'CANCELADOS') {
      assinaturasDominio = await this.repAssinaturas.buscarCanceladas();
    } else {
      assinaturasDominio = await this.repAssinaturas.buscarTodas();
    }

    // Mapeia a entidade de domínio para o DTO de resposta exigido nas especificações
    return assinaturasDominio.map((assinatura) => ({
      codigoAssinatura: assinatura.codigo!,
      codigoCliente: assinatura.codCli,
      codigoPlano: assinatura.codPlano,
      dataInicio: assinatura.inicioFidelidade,
      dataFim: assinatura.fimFidelidade,
      status: assinatura.isAtiva() ? 'ATIVO' : 'CANCELADO',
    }));
  }
}
