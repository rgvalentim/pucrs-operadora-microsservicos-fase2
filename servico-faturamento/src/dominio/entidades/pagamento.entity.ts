export class Pagamento {
  codigo?: number;
  dia: number;
  mes: number;
  ano: number;
  codAss: number;
  valorPago: number;

  constructor(
    dia: number,
    mes: number,
    ano: number,
    codAss: number,
    valorPago: number,
  ) {
    this.dia = dia;
    this.mes = mes;
    this.ano = ano;
    this.codAss = codAss;
    this.valorPago = valorPago;
  }
}
