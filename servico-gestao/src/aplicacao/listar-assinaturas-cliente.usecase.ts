import { Inject, Injectable } from '@nestjs/common';
import type { IRepAssinaturas } from '../dominio/repositorios/irep-assinaturas';
import { AssinaturaRespostaDto } from '../interface/dtos/assinatura-resposta.dto';

@Injectable()
export class ListarAssinaturasClienteUc {
  constructor(
    @Inject('IRepAssinaturas')
    private readonly repAssinaturas: IRepAssinaturas,
  ) {}

  async executar(codCli: number): Promise<AssinaturaRespostaDto[]> {
    const assinaturasDominio =
      await this.repAssinaturas.buscarPorCliente(codCli);

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
