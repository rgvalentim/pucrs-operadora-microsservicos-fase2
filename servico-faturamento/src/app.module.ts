import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [], // Array vazio. Preencheremos no próximo passo.
        synchronize: true, // Sincronização automática para agilidade no ambiente acadêmico
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
