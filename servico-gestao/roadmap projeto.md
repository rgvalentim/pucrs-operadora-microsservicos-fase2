- [x] Etapa 1: Configuração do Ambiente e Base de Dados
  - [x] Inicializar o projeto NestJS estruturado para a Fase 1 (`servico-gestao`)[cite: 11, 13].
  - [x] Configurar a conexão com o banco de dados (Relacional via TypeORM ou conectores, conforme o padrão das aulas)[cite: 4, 5].
  - [x] Implementar o script de *Seeding* para popular previamente 10 clientes, 5 planos e 5 assinaturas no banco de dados[cite: 13].

- [ ] Etapa 2: Modelagem de Domínio e Arquitetura Limpa (Clean Architecture)
  - [x] Definir as Entidades de Domínio puras (*Domain Models*): `Plano`, `Cliente`, `Assinatura` e `Pagamento` (com seus respectivos atributos descritos no PDF)[cite: 13].
  - [x] Criar as interfaces de Repositórios de Domínio (`IRepProdutos`, `IRepClientes`, `IRepAssinaturas`, etc.).
  - [x] Estruturar as camadas da Arquitetura Limpa: Camada de Domínio, Camada de Aplicação (Casos de Uso / *Use Cases*), Camada de Infraestrutura/Persistência e Camada de Interface (*Controllers*).

- [ ] Etapa 3: Implementação dos Casos de Uso e Endpoints da Fase 1 (ServicoGestao)
  - [x] **Endpoint 1:** `GET /gestao/clientes` (Listar todos os clientes cadastrados)[cite: 13].
  - [x] **Endpoint 2:** `GET /gestao/planos` (Listar todos os planos cadastrados)[cite: 13].
  - [x] **Endpoint 3:** `POST /gestao/assinaturas` (Criar uma nova assinatura com vigência de fidelidade de 365 dias)[cite: 13].
  - [x] **Endpoint 4:** `PATCH /gestao/planos/:idPlano` (Atualizar o custo mensal do plano)[cite: 13].
  - [x] **Endpoint 5:** `GET /gestao/assinaturas/{tipo}` (Filtrar por `TODOS`, `ATIVOS`, `CANCELADOS`)[cite: 13].
  - [x] **Endpoint 6:** `GET /gestao/assinaturascliente/:codcli` (Listar assinaturas de um cliente específico)[cite: 13].
  - [x] **Endpoint 7:** `GET /gestao/assinaturasplano/:codplano` (Listar assinaturas de um plano específico)[cite: 13].

- [ ] Etapa 4: Configuração Final, Validação, Testes e Documentação
  - [x] **Sub-tópico 4.1: Injeção de Dependências e Seeding:** Registrar os Repositórios, Casos de Uso e Controllers no `app.module.ts` e finalizar a lógica do `seeding.service.ts` para popular o banco de dados.
  - [x] **Sub-tópico 4.2: Validação da API:** Rodar a aplicação e validar todas as rotas utilizando a coleção do Postman adaptada/atualizada[cite: 11, 12, 13].
  - [x] **Sub-tópico 4.3: Diagramação:** Elaborar o Diagrama UML descrevendo as classes e módulos do sistema[cite: 11].
  - [x] **Sub-tópico 4.4: Relatório Técnico:** Escrever o documento em PDF detalhando a aplicação dos princípios SOLID, os padrões de projeto utilizados, as orientações de execução e o relato de desenvolvimento[cite: 11].
  - [ ] **Sub-tópico 4.5: Empacotamento:** Organizar os arquivos e gerar o `.zip` padrão (`seu_nome-desenvol-sistemas-backend-fase-1.zip`)[cite: 11].