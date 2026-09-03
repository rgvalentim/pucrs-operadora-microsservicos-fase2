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
import { ClientProxy } from '@nestjs/microservices';
import type { IRepAssinaturas } from '../dominio/repositorios/irep-assinaturas';
import { Assinatura } from '../dominio/entidades/assinatura.entity';
import { CriarAssinaturaDto } from '../interface/dtos/criar-assinatura.dto';

@Injectable()
export class CriarAssinaturaUc {
  constructor(
    @Inject('IRepAssinaturas')
    private readonly repAssinaturas: IRepAssinaturas,

    // A nova injeção do Broker de Mensagens:
    @Inject('MENSAGERIA_RABBITMQ') private readonly rabbitClient: ClientProxy,
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

    // 1. Salvar no banco ANTES de emitir o evento
    // O await garante que o sistema só continue se o banco confirmar a gravação.
    const assinaturaSalva = await this.repAssinaturas.cadastrar(novaAssinatura);

    // 2. Disparo do Evento (Publish)
    // Note que o bloco antigo com o "999" não existe mais.
    // Pegamos o ID real (assinaturaSalva.id) que o banco de dados acabou de gerar.
    this.rabbitClient.emit('AssinaturaCriada', {
      codAss: assinaturaSalva.codigo,
      codCli: assinaturaSalva.codCli,
      codPlano: assinaturaSalva.codPlano,
      status: 'ATIVA',
      timestamp: new Date().toISOString(),
    });

    // 3. Retorno da API para o Controller
    return assinaturaSalva;
  }
}
