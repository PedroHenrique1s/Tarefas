# Projeto Gerenciador de Tarefas

## 📖 Sobre o Projeto

Este é um projeto front-end de um **Gerenciador de Tarefas**, desenvolvido em Angular. A aplicação permite que os usuários se autentiquem de forma segura, visualizem e gerenciem suas tarefas.

O principal objetivo é fornecer uma interface limpa e funcional, consumindo dados de uma API de tarefas externa e aplicando as melhores práticas de desenvolvimento com Angular, como a componentização, o uso de serviços e a proteção de rotas.


## ✨ Funcionalidades Principais

* **Autenticação com JWT:** Sistema completo de autenticação de usuários utilizando JSON Web Tokens.
    * **Login e Logout:** Telas e lógicas para o usuário entrar e sair do sistema.
    * **Gerenciamento de Token:** O `AuthService` é responsável por obter, armazenar e remover o token de autenticação.
    * **Refresh Token:** Implementada a funcionalidade de *refresh token* para renovar a sessão do usuário automaticamente, melhorando a experiência de uso sem comprometer a segurança.
* **Controle de Acesso:**
    * **Guards (`auth.guard.ts`):** Proteção de rotas para garantir que apenas usuários autenticados possam acessar as páginas restritas, como o painel de tarefas.
* **Comunicação com a API:**
    * **Interceptor (`auth.interceptor.ts`):** Intercepta todas as requisições HTTP enviadas à API e anexa automaticamente o token JWT no cabeçalho `Authorization`, simplificando a comunicação segura.
    * **Serviços (`auth.service.ts`, `tarefas.service.ts`):** Centralizam toda a lógica de comunicação com o backend, separando as responsabilidades da aplicação.
* **Componentes Reutilizáveis:**
    * **Tabela Dinâmica (`Shared/dynamic-table`):** Um componente compartilhado e configurável para exibir dados em formato de tabela. Ele pode ser reutilizado em diferentes partes do sistema para listar informações variadas, bastando para isso definir suas colunas e dados.
* **Estrutura Organizada:**
    * **Interfaces (`Interface`):** Uso de interfaces TypeScript para garantir a tipagem e a consistência dos dados em toda a aplicação.
    * **Componentização:** O projeto é dividido em componentes claros e com responsabilidades únicas, como `login`, `menu` e o componente filho `tarefas`.


## 🖼️ Screenshots

### Tela de Login
<img width="1323" height="638" alt="image" src="https://github.com/user-attachments/assets/0d811bcf-b407-46ee-a894-15f70b218748" />

### Listagem de Tarefas
<img width="1365" height="321" alt="image" src="https://github.com/user-attachments/assets/b4e4cbc6-6d38-4f84-b2d4-1658dcbd1e4e" />


## 📂 Estrutura do Projeto

A estrutura de pastas do projeto foi organizada para facilitar a manutenção e a escalabilidade, seguindo as convenções da comunidade Angular:

src/app/
├── Components/
│   ├── login/         # Componente de autenticação
│   ├── menu/          # Componente de navegação principal
│   └── tarefas/       # Componente para gerenciar tarefas
│
├── Guards/
│   └── auth.guard.ts  # Guarda de rota para proteger páginas
│
├── Interceptors/
│   └── auth.interceptor.ts # Interceptor para adicionar o token JWT nas requisições
│
├── Interface/
│   ├── ienum.ts
│   └── idynamic-table.ts # Interfaces para tipagem de dados
│
├── Services/
│   ├── auth.service.ts    # Serviço de autenticação (login, logout, token)
│   └── tarefas.service.ts # Serviço para as operações da API de tarefas
│
└── Shared/
└── dynamic-table/ # Componente compartilhado de tabela dinâmica

## 🛠️ Tecnologias Utilizadas

* **Angular V17**
* **TypeScript**
* **HTML5**
* **CSS3**

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute a aplicação:**
    ```bash
    ng serve
    ```

5.  Abra seu navegador e acesse `http://localhost:4200/`.

> **Nota:** Este projeto é o front-end de uma aplicação e depende de uma **API de Tarefas** para funcionar. Certifique-se de que a API esteja em execução e que a URL base no arquivo de ambiente do Angular (`src/environments/environment.ts`) esteja configurada corretamente.
