export class Plano {
  codigo?: number; //opcional devido ao fato de que quando é criado um novo Plano na memória ele não tem ainda um ID gerado pelo banco.
  nome: string;
  custoMensal: number;
  data: Date;
  descricao: string;

  constructor(
    nome: string,
    custoMensal: number,
    data: Date,
    descricao: string,
    codigo?: number,
  ) {
    this.nome = nome;
    this.custoMensal = custoMensal;
    this.data = data;
    this.descricao = descricao;
    this.codigo = codigo;
  }
}
