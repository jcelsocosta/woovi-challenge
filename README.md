# Full Stack Developer Challenge

Este repositório contém o desafio para desenvolvedores Full Stack. O objetivo é criar uma API GraphQL que lida com funcionalidades básicas de um sistema bancário.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-brightgreen)

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)

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

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/fullstack-developer-challenge.git
   cd fullstack-developer-challenge
