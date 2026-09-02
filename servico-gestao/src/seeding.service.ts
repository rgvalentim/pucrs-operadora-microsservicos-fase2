import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteTypeOrmEntity } from './persistencia/entidades/cliente.typeorm.entity';
import { PlanoTypeOrmEntity } from './persistencia/entidades/plano.typeorm.entity';
import { AssinaturaTypeOrmEntity } from './persistencia/entidades/assinatura.typeorm.entity';

@Injectable()
export class ServicoSeeding implements OnModuleInit {
  constructor(
    @InjectRepository(ClienteTypeOrmEntity)
    private readonly clienteRep: Repository<ClienteTypeOrmEntity>,
    @InjectRepository(PlanoTypeOrmEntity)
    private readonly planoRep: Repository<PlanoTypeOrmEntity>,
    @InjectRepository(AssinaturaTypeOrmEntity)
    private readonly assinaturaRep: Repository<AssinaturaTypeOrmEntity>,
  ) {}

  async onModuleInit() {
    await this.popularBancoDeDados();
  }

  private async popularBancoDeDados() {
    const quantidadeClientes = await this.clienteRep.count();

    // Só roda o script se o banco estiver vazio
    if (quantidadeClientes === 0) {
      console.log('Iniciando o seeding do banco de dados...');

      // Inserindo 10 clientes (TIPAGEM EXPLÍCITA ADICIONADA AQUI)
      const clientes: ClienteTypeOrmEntity[] = [];
      for (let i = 1; i <= 10; i++) {
        const cliente = this.clienteRep.create({
          nome: `Cliente ${i}`,
          email: `cliente${i}@operadora.com`,
        });
        clientes.push(await this.clienteRep.save(cliente));
      }

      // Inserindo 5 planos (TIPAGEM EXPLÍCITA ADICIONADA AQUI)
      const planos: PlanoTypeOrmEntity[] = [];
      for (let i = 1; i <= 5; i++) {
        const plano = this.planoRep.create({
          nome: `Plano ${i}00 Mega`,
          custoMensal: i * 50.0,
          data: new Date(),
          descricao: `Internet fibra óptica de ${i}00 Mega.`,
        });
        planos.push(await this.planoRep.save(plano));
      }

      // Inserindo 5 assinaturas
      const dataAtual = new Date();
      const dataFimFidelidade = new Date();
      dataFimFidelidade.setDate(dataAtual.getDate() + 365);

      for (let i = 0; i < 5; i++) {
        const assinatura = this.assinaturaRep.create({
          codCli: clientes[i].codigo,
          codPlano: planos[i].codigo,
          inicioFidelidade: dataAtual,
          fimFidelidade: dataFimFidelidade,
          dataUltimoPagamento: dataAtual,
          custoFinal: planos[i].custoMensal,
          descricao: 'Assinatura gerada automaticamente via script de seeding.',
        });
        await this.assinaturaRep.save(assinatura);
      }

      console.log(
        'Seeding concluído com sucesso. (10 Clientes, 5 Planos, 5 Assinaturas)',
      );
    }
  }
}
