import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IRepPlanos } from '../dominio/repositorios/irep-planos';
import { Plano } from '../dominio/entidades/plano.entity';
import { PlanoTypeOrmEntity } from './entidades/plano.typeorm.entity';

@Injectable()
export class RepositorioPlanos implements IRepPlanos {
  constructor(
    @InjectRepository(PlanoTypeOrmEntity)
    private readonly planoRep: Repository<PlanoTypeOrmEntity>,
  ) {}

  async buscarTodos(): Promise<Plano[]> {
    const planosTypeOrm = await this.planoRep.find();
    return planosTypeOrm.map((planoOrm) => this.mapearParaDominio(planoOrm));
  }

  async buscarPorCodigo(codigo: number): Promise<Plano | null> {
    const planoTypeOrm = await this.planoRep.findOneBy({ codigo });
    if (!planoTypeOrm) return null;
    return this.mapearParaDominio(planoTypeOrm);
  }

  async atualizar(plano: Plano): Promise<Plano> {
    const planoOrm = await this.planoRep.findOneBy({ codigo: plano.codigo });
    if (!planoOrm) throw new Error('Plano não encontrado.');

    planoOrm.custoMensal = plano.custoMensal;
    planoOrm.data = plano.data;

    const planoAtualizado = await this.planoRep.save(planoOrm);
    return this.mapearParaDominio(planoAtualizado);
  }

  private mapearParaDominio(planoOrm: PlanoTypeOrmEntity): Plano {
    return new Plano(
      planoOrm.nome,
      Number(planoOrm.custoMensal),
      planoOrm.data,
      planoOrm.descricao,
      planoOrm.codigo,
    );
  }
}
