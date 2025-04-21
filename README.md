# Visão Geral

Este repositório contém uma aplicação exemplo em React + TypeScript + Vite para demonstrar a integração com APIs (via ViaCEP) usando fetch ou um wrapper HTTP genérico. Foi desenvolvido como material didático para novos membros da Dev. Community Mauá de 2025.

## Principais funcionalidades

- **Busca de CEP:** formulário para digitar e validar CEP (com ou sem hífen) antes de consultar a API.
- **Validação de entrada:** utilitário validateCep garante formato 12345678 ou 12345-678.
- **Wrapper HTTP:** função genérica httpRequest<T> com tipagem forte, timeout e tratamento de erros.
- **Loading e erros:** spinner via react-icons e mensagens de erro direcionadas.
- **Exibição condicional:** renderização dos dados retornados (logradouro, bairro, cidade, UF etc.) apenas quando disponíveis.

# Como executar localmente

1.	Clone o repositório

```bash
git clone https://github.com/enzosakamoto/integracao-apis.git
cd integracao-apis
```

2.	Instale dependências

```bash
npm install
# ou
yarn
```

3.	Inicie em modo de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

4.	Abra `http://localhost:5173` no navegador
