import { Assinatura } from '../entidades/assinatura.entity';

export interface IRepAssinaturas {
  cadastrar(assinatura: Assinatura): Promise<Assinatura>;
  buscarTodas(): Promise<Assinatura[]>;
  buscarAtivas(): Promise<Assinatura[]>;
  buscarCanceladas(): Promise<Assinatura[]>;
  buscarPorCliente(codCli: number): Promise<Assinatura[]>;
  buscarPorPlano(codPlano: number): Promise<Assinatura[]>;
}
