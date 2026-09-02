/**
 * Repositório Concreto - Infraestrutura / Persistência
 *
 * Responsabilidade (SRP): Isolar a comunicação com o banco de dados (MySQL/TypeORM).
 * Implementa o padrão Data Mapper, realizando a tradução (de/para) entre a
 * entidade poluída de infraestrutura (AssinaturaTypeOrmEntity) e a entidade
 * purista de domínio (Assinatura). Graças a esta classe, o restante do sistema
 * desconhece qual banco de dados está sendo utilizado.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';
import type { IRepAssinaturas } from '../dominio/repositorios/irep-assinaturas';
import { Assinatura } from '../dominio/entidades/assinatura.entity';
import { AssinaturaTypeOrmEntity } from './entidades/assinatura.typeorm.entity';

@Injectable()
export class RepositorioAssinaturas implements IRepAssinaturas {
  constructor(
    @InjectRepository(AssinaturaTypeOrmEntity)
    private readonly assinaturaRep: Repository<AssinaturaTypeOrmEntity>,
  ) {}

  async cadastrar(assinatura: Assinatura): Promise<Assinatura> {
    const assinaturaOrm = this.assinaturaRep.create({
      codPlano: assinatura.codPlano,
      codCli: assinatura.codCli,
      inicioFidelidade: assinatura.inicioFidelidade,
      fimFidelidade: assinatura.fimFidelidade,
      dataUltimoPagamento: assinatura.dataUltimoPagamento,
      custoFinal: assinatura.custoFinal,
      descricao: assinatura.descricao,
    });

    const assinaturaSalva = await this.assinaturaRep.save(assinaturaOrm);
    return this.mapearParaDominio(assinaturaSalva);
  }

  async buscarTodas(): Promise<Assinatura[]> {
    const assinaturasOrm = await this.assinaturaRep.find();
    return assinaturasOrm.map((orm) => this.mapearParaDominio(orm));
  }

  async buscarAtivas(): Promise<Assinatura[]> {
    const dataAtual = new Date();
    const assinaturasOrm = await this.assinaturaRep.find({
      where: { fimFidelidade: MoreThan(dataAtual) },
    });
    return assinaturasOrm.map((orm) => this.mapearParaDominio(orm));
  }

  async buscarCanceladas(): Promise<Assinatura[]> {
    const dataAtual = new Date();
    // Se a data de fim da fidelidade já passou (ou é hoje), consideramos cancelada
    const assinaturasOrm = await this.assinaturaRep.find({
      where: { fimFidelidade: LessThanOrEqual(dataAtual) },
    });
    return assinaturasOrm.map((orm) => this.mapearParaDominio(orm));
  }

  async buscarPorCliente(codCli: number): Promise<Assinatura[]> {
    const assinaturasOrm = await this.assinaturaRep.findBy({ codCli });
    return assinaturasOrm.map((orm) => this.mapearParaDominio(orm));
  }

  async buscarPorPlano(codPlano: number): Promise<Assinatura[]> {
    const assinaturasOrm = await this.assinaturaRep.findBy({ codPlano });
    return assinaturasOrm.map((orm) => this.mapearParaDominio(orm));
  }

  private mapearParaDominio(
    assinaturaOrm: AssinaturaTypeOrmEntity,
  ): Assinatura {
    return new Assinatura(
      assinaturaOrm.codPlano,
      assinaturaOrm.codCli,
      assinaturaOrm.inicioFidelidade,
      assinaturaOrm.fimFidelidade,
      assinaturaOrm.dataUltimoPagamento,
      Number(assinaturaOrm.custoFinal),
      assinaturaOrm.descricao,
      assinaturaOrm.codigo,
    );
  }
}
