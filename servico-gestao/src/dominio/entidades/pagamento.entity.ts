export class Pagamento {
  codigo?: number; //opcional devido ao fato de que quando é criado um novo Plano na memória ele não tem ainda um ID gerado pelo banco.
  codAss: number;
  valorPago: number;
  dataPagamento: Date;

  constructor(
    codAss: number,
    valorPago: number,
    dataPagamento: Date,
    codigo?: number,
  ) {
    this.codAss = codAss;
    this.valorPago = valorPago;
    this.dataPagamento = dataPagamento;
    this.codigo = codigo;
  }
}
