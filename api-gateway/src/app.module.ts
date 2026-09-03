import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // ---------------------------------------------------------
    // Roteamento para o ServicoGestao (Fase 1) - Porta 3001
    // ---------------------------------------------------------
    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3001',
          changeOrigin: true,
        }),
      )
      .forRoutes(
        { path: 'gestao', method: RequestMethod.ALL },
        { path: 'gestao/{*path}', method: RequestMethod.ALL },
      );

    // ---------------------------------------------------------
    // Roteamento para o ServicoFaturamento (Fase 2) - Porta 3002
    // ---------------------------------------------------------
    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3002',
          changeOrigin: true,
        }),
      )
      .forRoutes(
        { path: 'registrarpagamento', method: RequestMethod.ALL },
        { path: 'registrarpagamento/{*path}', method: RequestMethod.ALL },
      );

    // ---------------------------------------------------------
    // Roteamento para o ServicoPlanosAtivos (Fase 2) - Porta 3003
    // ---------------------------------------------------------
    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3003',
          changeOrigin: true,
        }),
      )
      .forRoutes(
        { path: 'planosativos', method: RequestMethod.ALL },
        { path: 'planosativos/{*path}', method: RequestMethod.ALL },
      );
  }
}
