import { Injectable, Inject } from '@nestjs/common';
import type { IRepPagamentos } from '../dominio/repositorios/irep-pagamentos';
import { Pagamento } from '../dominio/entidades/pagamento.entity';
import { RegistrarPagamentoDto } from '../interface/dtos/registrar-pagamento.dto';

@Injectable()
export class RegistrarPagamentoUc {
  constructor(
    @Inject('IRepPagamentos')
    private readonly repPagamentos: IRepPagamentos,
  ) {}

  async executar(dados: RegistrarPagamentoDto): Promise<Pagamento> {
    // Instancia a entidade pura do domínio
    const novoPagamento = new Pagamento(
      dados.dia,
      dados.mes,
      dados.ano,
      dados.codAss,
      dados.valorPago,
    );

    // Salva no banco de dados e retorna o objeto com o ID (código) gerado
    return await this.repPagamentos.registrar(novoPagamento);
  }
}
