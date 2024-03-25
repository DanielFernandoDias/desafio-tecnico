## Projeto de Gestão de Parceiros e Empresas Externas

Este projeto consiste em uma aplicação web para gerenciamento de parceiros e empresas externas, desenvolvido utilizando Angular para o frontend e integração com uma API para persistência de dados.

### Funcionalidades

- **Página de Login**: Permite ao usuário entrar na aplicação inserindo seu usuário e senha. Ao clicar em "Entrar", o usuário é redirecionado para a página inicial pois não possui autenticação.

- **Manter Conectado**: Se o usuário marcar a opção "Manter Conectado" ao fazer login, suas credenciais serão armazenadas no cookie. Caso contrário, as credenciais serão armazenadas no Local Storage.

- **Página Inicial**: Apresenta um layout da aplicação com um menu contendo opções para cadastrar parceiros, listar todos os parceiros, acessar informações sobre a aplicação, sair e também cadastrar e listar empresas externas.

- **Cadastro de Parceiro**: Permite ao usuário cadastrar novos parceiros.

- **Listagem de Parceiros**: Apresenta todos os parceiros em uma tabela paginada, com opções para editar e excluir registros.

- **Página "Sobre a Aplicação"**: Fornece informações sobre o projeto, incluindo tecnologias utilizadas, finalidade da aplicação, entre outros detalhes relevantes.

- **Cadastro de Empresa Externa**: Permite ao usuário cadastrar novas empresas externas.

- **Listagem de Empresas Externas**: Apresenta todas as empresas externas em uma tabela paginada, com opções para editar e excluir registros.

- **Compartilhamento de Dados da Tabela**: Ao compartilhar o link da página com outra pessoa, ela será redirecionada para a página específica da tabela, mantendo a paginação conforme configurado pelo usuário.

- **Integração com API**: A aplicação se integra com uma API para realizar operações de CRUD (Create, Read, Update, Delete) e persistir os dados.

### Instruções para navegar pelas funcionalidades

- **Tela de Login**: Nessa página, só é necessário digitar um email válido e uma senha 'qualquer' o app não possui autenticação.

- **Menu**: Ao entrar na página inicial, verá que existe um menu no toolbar

- **Navegação**: Ao navegar pelo sistema, pode acontecer que rolê pequenos bugs, porém esses bugs já foram mapeados

### Instruções para Executar o Projeto

#### Esse Projeto já está em Deploy no seguinte endereço

https://desafio-tecnico-jet.vercel.app/

1. Clone este repositório: `git clone` e instala a versão correto do angular no projeto

npm install -g @angular/cli@15

2. Instale as dependências do projeto:

cd <nome-do-projeto>
npm install


3. Execute o servidor de desenvolvimento:

ng serve


4. Acesse a aplicação em seu navegador utilizando o seguinte endereço: `http://localhost:4200`

### Requisitos do Ambiente

- Node.js
- Angular CLI V. 15

Certifique-se de ter o Node.js instalado em sua máquina para instalar as dependências do projeto. Você também precisará do Angular CLI para executar a aplicação localmente.

### To-Do List do Projeto

#### Coisas Feitas
- [x] Página de Login
- [x] Funcionalidade de Manter Conectado
- [x] Página Inicial
- [x] Cadastro de Parceiro
- [x] Cadastro de Empresa Externa
- [x] Listagem de Parceiros
- [x] Listagem de Empresas Externas
- [x] Página "Sobre a Aplicação"
- [x] Compartilhamento de Dados da Tabela
- [x] Integração com API para Persistir o CRUD
- [x] README.md completo e descritivo

#### Coisas a Fazer
- [ ] Implementar a funcionalidade de redirecionamento após o login para o link compartilhado
- [ ] Melhorar o design e layout da página de login
- [ ] concertar bugs em algumas funcionalidades
- [ ] Otimizar código, refatorando alguns componentes para deixá-los mais genérico
- [ ] Adicionar testes automatizados para garantir a robustez do código

