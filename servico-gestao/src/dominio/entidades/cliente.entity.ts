export class Cliente {
  codigo?: number; //opcional devido ao fato de que quando é criado um novo Plano na memória ele não tem ainda um ID gerado pelo banco.
  nome: string;
  email: string;

  constructor(nome: string, email: string, codigo?: number) {
    this.nome = nome;
    this.email = email;
    this.codigo = codigo;
  }
}
