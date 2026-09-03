import { Controller, Post, Body } from '@nestjs/common';
import { RegistrarPagamentoUc } from '../aplicacao/registrar-pagamento.usecase';
import { RegistrarPagamentoDto } from './dtos/registrar-pagamento.dto';

@Controller()
export class FaturamentoController {
  constructor(private readonly registrarPagamentoUc: RegistrarPagamentoUc) {}

  @Post('registrarpagamento')
  async registrarPagamento(@Body() dados: RegistrarPagamentoDto) {
    // O Controller não tem lógica de negócio, apenas orquestra a chamada
    return await this.registrarPagamentoUc.executar(dados);
  }
}
