/**
 * Controller REST - Microsserviço ServicoGestao
 *
 * Responsabilidade (SRP): Atuar como um Adaptador (Adapter) de interface.
 * Recebe as requisições HTTP, extrai os parâmetros (Body, Param) e delega
 * a execução das regras de negócio exclusivamente para a camada de Aplicação (Use Cases).
 * Este arquivo não deve conter regras de negócio nem acesso direto ao banco de dados,
 * respeitando os princípios da Arquitetura Limpa.
 */

import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ListarClientesUc } from '../aplicacao/listar-clientes.usecase';
import { ListarPlanosUc } from '../aplicacao/listar-planos.usecase';
import { CriarAssinaturaUc } from '../aplicacao/criar-assinatura.usecase';
import { AtualizarCustoPlanoUc } from '../aplicacao/atualizar-custo-plano.usecase';
import { ListarAssinaturasTipoUc } from '../aplicacao/listar-assinaturas-tipo.usecase';
import { ListarAssinaturasClienteUc } from '../aplicacao/listar-assinaturas-cliente.usecase';
import { ListarAssinaturasPlanoUc } from '../aplicacao/listar-assinaturas-plano.usecase';
import { CriarAssinaturaDto } from './dtos/criar-assinatura.dto';
import { AtualizarCustoPlanoDto } from './dtos/atualizar-custo-plano.dto';

@Controller('gestao')
export class GestaoController {
  constructor(
    private readonly listarClientesUc: ListarClientesUc,
    private readonly listarPlanosUc: ListarPlanosUc,
    private readonly criarAssinaturaUc: CriarAssinaturaUc,
    private readonly atualizarCustoPlanoUc: AtualizarCustoPlanoUc,
    private readonly listarAssinaturasTipoUc: ListarAssinaturasTipoUc,
    private readonly listarAssinaturasClienteUc: ListarAssinaturasClienteUc,
    private readonly listarAssinaturasPlanoUc: ListarAssinaturasPlanoUc,
  ) {}

  @Get('clientes')
  async listarClientes() {
    return await this.listarClientesUc.executar();
  }

  @Get('planos')
  async listarPlanos() {
    return await this.listarPlanosUc.executar();
  }

  @Post('assinaturas')
  async criarAssinatura(@Body() dadosAssinatura: CriarAssinaturaDto) {
    return await this.criarAssinaturaUc.executar(dadosAssinatura);
  }

  @Patch('planos/:idPlano')
  async atualizarCustoPlano(
    @Param('idPlano') idPlano: string,
    @Body() dadosAtualizacao: AtualizarCustoPlanoDto,
  ) {
    // O parâmetro extraído da URL é sempre uma string. Convertê-lo garante consistência.
    return await this.atualizarCustoPlanoUc.executar(
      Number(idPlano),
      dadosAtualizacao,
    );
  }

  @Get('assinaturas/:tipo')
  async listarAssinaturasPorTipo(@Param('tipo') tipo: string) {
    return await this.listarAssinaturasTipoUc.executar(tipo);
  }

  @Get('assinaturascliente/:codcli')
  async listarAssinaturasPorCliente(@Param('codcli') codcli: string) {
    return await this.listarAssinaturasClienteUc.executar(Number(codcli));
  }

  @Get('assinaturasplano/:codplano')
  async listarAssinaturasPorPlano(@Param('codplano') codplano: string) {
    return await this.listarAssinaturasPlanoUc.executar(Number(codplano));
  }
}
