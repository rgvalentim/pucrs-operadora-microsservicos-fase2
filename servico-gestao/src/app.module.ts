/**
 * Módulo Principal (Maestro da Injeção de Dependência)
 *
 * Responsabilidade: Inicializar o framework NestJS e orquestrar a Inversão de Controle (IoC).
 * É neste arquivo que registramos os provedores (providers) e instruímos o framework
 * a injetar as classes concretas de Repositório sempre que um Caso de Uso exigir
 * uma interface de domínio (ex: IRepAssinaturas -> RepositorioAssinaturas).
 * Também configura a conexão global do TypeORM com o banco de dados.
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades TypeORM
import { ClienteTypeOrmEntity } from './persistencia/entidades/cliente.typeorm.entity';
import { PlanoTypeOrmEntity } from './persistencia/entidades/plano.typeorm.entity';
import { AssinaturaTypeOrmEntity } from './persistencia/entidades/assinatura.typeorm.entity';

// Repositórios Concretos
import { RepositorioClientes } from './persistencia/repositorio-clientes';
import { RepositorioPlanos } from './persistencia/repositorio-planos';
import { RepositorioAssinaturas } from './persistencia/repositorio-assinaturas';

// Casos de Uso
import { ListarClientesUc } from './aplicacao/listar-clientes.usecase';
import { ListarPlanosUc } from './aplicacao/listar-planos.usecase';
import { CriarAssinaturaUc } from './aplicacao/criar-assinatura.usecase';
import { AtualizarCustoPlanoUc } from './aplicacao/atualizar-custo-plano.usecase';
import { ListarAssinaturasTipoUc } from './aplicacao/listar-assinaturas-tipo.usecase';
import { ListarAssinaturasClienteUc } from './aplicacao/listar-assinaturas-cliente.usecase';
import { ListarAssinaturasPlanoUc } from './aplicacao/listar-assinaturas-plano.usecase';

// Controller
import { GestaoController } from './interface/gestao.controller';

// Seeding
import { ServicoSeeding } from './seeding.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (servicoConfiguracao: ConfigService) => ({
        type: 'mysql',
        host: servicoConfiguracao.get<string>('DB_HOST'),
        port: servicoConfiguracao.get<number>('DB_PORT'),
        username: servicoConfiguracao.get<string>('DB_USUARIO'),
        password: servicoConfiguracao.get<string>('DB_SENHA'),
        database: servicoConfiguracao.get<string>('DB_NOME'),
        entities: [
          ClienteTypeOrmEntity,
          PlanoTypeOrmEntity,
          AssinaturaTypeOrmEntity,
        ],
        synchronize: true,
      }),
    }),
    // Registra as entidades do escopo atual para os InjectRepository funcionarem
    TypeOrmModule.forFeature([
      ClienteTypeOrmEntity,
      PlanoTypeOrmEntity,
      AssinaturaTypeOrmEntity,
    ]),
  ],
  controllers: [GestaoController],
  providers: [
    // -------------------------------------------------------------------
    // Injeção de Dependências (Contrato -> Implementação)
    // -------------------------------------------------------------------
    { provide: 'IRepClientes', useClass: RepositorioClientes },
    { provide: 'IRepPlanos', useClass: RepositorioPlanos },
    { provide: 'IRepAssinaturas', useClass: RepositorioAssinaturas },

    // -------------------------------------------------------------------
    // Casos de Uso
    // -------------------------------------------------------------------
    ListarClientesUc,
    ListarPlanosUc,
    CriarAssinaturaUc,
    AtualizarCustoPlanoUc,
    ListarAssinaturasTipoUc,
    ListarAssinaturasClienteUc,
    ListarAssinaturasPlanoUc,

    // -------------------------------------------------------------------
    // Scripts e Serviços de Infraestrutura
    // -------------------------------------------------------------------
    ServicoSeeding,
  ],
})
export class AppModule {}
