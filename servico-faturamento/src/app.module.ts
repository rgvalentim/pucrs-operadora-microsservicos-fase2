import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importações das Entidades e Repositórios
import { PagamentoTypeOrmEntity } from './persistencia/entidades/pagamento.typeorm.entity';
import { RepositorioPagamentos } from './persistencia/repositorio-pagamentos';
import { FaturamentoController } from './interface/faturamento.controller';
import { RegistrarPagamentoUc } from './aplicacao/registrar-pagamento.usecase';

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
        // 1. Ensinamos o TypeORM a criar a tabela 'pagamentos'
        entities: [PagamentoTypeOrmEntity],
        synchronize: true,
      }),
    }),
    // 2. Disponibiliza a entidade para o InjectRepository funcionar dentro do nosso RepositorioPagamentos
    TypeOrmModule.forFeature([PagamentoTypeOrmEntity]),
  ],
  controllers: [FaturamentoController],
  providers: [
    // 3. Injeção de Dependência (Contrato -> Implementação)
    {
      provide: 'IRepPagamentos',
      useClass: RepositorioPagamentos,
    },
    RegistrarPagamentoUc,
  ],
})
export class AppModule {}
