import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IRepPagamentos } from '../dominio/repositorios/irep-pagamentos';
import { Pagamento } from '../dominio/entidades/pagamento.entity';
import { PagamentoTypeOrmEntity } from './entidades/pagamento.typeorm.entity';

@Injectable()
export class RepositorioPagamentos implements IRepPagamentos {
  constructor(
    @InjectRepository(PagamentoTypeOrmEntity)
    private readonly bancoDeDados: Repository<PagamentoTypeOrmEntity>,
  ) {}

  async registrar(pagamento: Pagamento): Promise<Pagamento> {
    // Transforma a entidade de domínio na entidade do TypeORM
    const pagamentoParaSalvar = this.bancoDeDados.create({
      dia: pagamento.dia,
      mes: pagamento.mes,
      ano: pagamento.ano,
      codAss: pagamento.codAss,
      valorPago: pagamento.valorPago,
    });

    const pagamentoSalvo = await this.bancoDeDados.save(pagamentoParaSalvar);

    // Retorna a entidade pura preenchida com o ID gerado pelo MySQL
    const pagamentoConvertido = new Pagamento(
      pagamentoSalvo.dia,
      pagamentoSalvo.mes,
      pagamentoSalvo.ano,
      pagamentoSalvo.codAss,
      Number(pagamentoSalvo.valorPago),
    );
    pagamentoConvertido.codigo = pagamentoSalvo.codigo;

    return pagamentoConvertido;
  }
}
