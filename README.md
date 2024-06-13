# Full Stack Developer Challenge

Este repositório contém o desafio para desenvolvedores Full Stack. O objetivo é criar uma API GraphQL que lida com funcionalidades básicas de um sistema bancário.

## Link
  ### Frontend
    http://codeinterviewstep.com

  ### Backend
    http://codeinterviewstep.com:3010/graphql

# Full Stack Developer Challenge - Backend

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-brightgreen)

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)

## Sobre

O backend deve ser uma API GraphQL que gerencia funcionalidades como registro e login de usuários, criação de contas e transações financeiras. Este projeto usa Node.js com Koa.js, MongoDB e GraphQL, e implementa autenticação com JWT.

## Funcionalidades

- **Registro de Usuário**
  - Mutation para registrar um novo usuário.
  - Retorna o usuário logado após registro bem-sucedido.
  - Criação de um usuário com nome, CPF/CNPJ e senha criptografada.
  - Garantia de unicidade do CPF/CNPJ.

- **Login de Usuário**
  - Mutation para login de um usuário.
  - Autenticação por token JWT.
  - Persistência do token entre requisições.

- **Modelo de Usuário**
  - Primeiro nome.
  - CPF/CNPJ (campo tax id).
  - Senha (criptografada).

- **Modelo de Conta**
  - ID único.
  - Número da conta.
  - ID do usuário proprietário.
  - Garantia de uma conta por usuário.
  - Cálculo de saldo usando uma estratégia de ledger.

- **Modelo de Transação**
  - Remetente (quem envia o dinheiro).
  - Destinatário (quem recebe o dinheiro).
  - Valor (em centavos ou decimal128).
  - Garantia de idempotência.

## Tecnologias Utilizadas

- **Backend**: Node.js, Koa.js
- **Banco de Dados**: MongoDB
- **API**: GraphQL
- **Autenticação**: JWT
- **Relay**: Utilizado para gerenciar coleções e listas

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-brightgreen)

# Full Stack Developer Challenge - Frontend

Este repositório contém o frontend do desafio para desenvolvedores Full Stack. O objetivo é criar uma interface web que permite aos usuários registrarem-se, fazer login, visualizar suas informações de conta e realizar transferências financeiras.


## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)

## Sobre

O frontend deve fornecer uma página de login/registro, exibir dados do usuário e da conta após o login, e permitir transferências de dinheiro entre contas. Este projeto usa Vite com React Router, Relay para gerenciar dados, e Shadcn para componentes de UI.

## Funcionalidades

- **Login e Registro**
  - Página para login e registro de usuários.
  - Retorna o usuário logado e mostra a página inicial após o login.

- **Página Inicial**
  - Exibe informações do usuário e da conta.
  - Botão de ação para transferir dinheiro entre contas.

## Tecnologias Utilizadas

- **Framework**: Vite
- **Biblioteca de UI**: React com Shadcn
- **Roteamento**: React Router
- **Gerenciamento de Dados**: Relay

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jcelsocosta/woovi-challenge
   cd woovi-challenge
