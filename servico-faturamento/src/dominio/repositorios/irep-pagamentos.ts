import { Pagamento } from '../entidades/pagamento.entity';

export interface IRepPagamentos {
  registrar(pagamento: Pagamento): Promise<Pagamento>;
}
