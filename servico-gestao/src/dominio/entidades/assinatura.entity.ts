/**
 * Entidade de Domínio Puro
 *
 * Responsabilidade (SRP): Representar o núcleo do negócio.
 * Esta classe é completamente isolada de frameworks, anotações de banco de dados
 * ou bibliotecas externas. Ela encapsula seus próprios dados e expõe comportamentos
 * (como o método isAtiva), garantindo que as regras de estado da assinatura
 * pertençam ao negócio e não ao banco de dados.
 */

export class Assinatura {
  codigo?: number; //opcional devido ao fato de que quando é criado um novo Plano na memória ele não tem ainda um ID gerado pelo banco.
  codPlano: number;
  codCli: number;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;

  constructor(
    codPlano: number,
    codCli: number,
    inicioFidelidade: Date,
    fimFidelidade: Date,
    dataUltimoPagamento: Date,
    custoFinal: number,
    descricao: string,
    codigo?: number,
  ) {
    this.codPlano = codPlano;
    this.codCli = codCli;
    this.inicioFidelidade = inicioFidelidade;
    this.fimFidelidade = fimFidelidade;
    this.dataUltimoPagamento = dataUltimoPagamento;
    this.custoFinal = custoFinal;
    this.descricao = descricao;
    this.codigo = codigo;
  }

  // Regra de negócio embutida no domínio: verifica se a assinatura está ativa
  // Uma assinatura é ativa se a data de fimFidelidade for maior que a data atual
  isAtiva(): boolean {
    const dataAtual = new Date();
    // Instancia um objeto Date garantido a partir do valor armazenado
    const fim = new Date(this.fimFidelidade);

    // Opcional: zera as horas para comparar apenas os dias (já que o banco é tipo 'date')
    dataAtual.setHours(0, 0, 0, 0);
    fim.setHours(0, 0, 0, 0);

    return fim >= dataAtual;
  }
}
