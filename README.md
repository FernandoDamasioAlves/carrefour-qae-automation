# Banco Carrefour — Desafio Técnico QAE

Projeto de automação de testes de API e Mobile, desenvolvido para o desafio técnico de Quality Assurance Engineer.

## Estrutura do projeto

- `api-tests/` — Testes de API.
- `mobile-tests/` — Testes Mobile.
- `docs/` — Relatório técnico.
- `.gitlab-ci.yml` — Configuração de integração contínua.

## Testes de API

**API utilizada:** https://serverest.dev

**Tecnologias:** Node.js, TypeScript, Vitest, Supertest e Zod.

### Execução

1. Acessar a pasta `api-tests`.
2. Executar `npm ci`.
3. Executar `npm run typecheck`.
4. Executar `npm test`.

### Cenários implementados

- Criação de usuários.
- Consulta e listagem de usuários.
- Atualização e exclusão.
- Validação de dados.
- Verificação de contratos de resposta.
- Autenticação.

**Resultado local:** 12 testes aprovados.

**Relatório JUnit:** `api-tests/reports/junit.xml`.

## Testes Mobile

**Aplicativo:** WebdriverIO Native Demo App v2.2.0.

**Tecnologias:** WebdriverIO, Appium, UiAutomator2, Mocha e Page Object Model.

### Pré-requisitos

- Node.js.
- Java JDK.
- Android SDK e emulador Android.
- Appium com driver UiAutomator2.
- Aplicativo `com.wdiodemoapp` instalado.

### Configuração

1. Acessar a pasta `mobile-tests`.
2. Executar `npm ci`.
3. Copiar `.env.example` para `.env`.
4. Configurar as variáveis com dados sintéticos.
5. Confirmar o dispositivo usando `adb devices`.
6. Iniciar o servidor com `npx appium`.

### Execução

Executar `npm run test:android` na pasta `mobile-tests`.

### Cenários implementados

- MOB-001: Exibição da tela inicial.
- MOB-002: Acesso ao Login.
- MOB-003: Preenchimento de credenciais.
- MOB-004: Validação de e-mail inválido.
- MOB-005: Navegação para cadastro.
- MOB-006: Exibição dos campos de cadastro.
- MOB-007: Preenchimento de dados de cadastro.
- MOB-008: Entrada e apresentação de texto.
- MOB-009: Alternância do switch e verificação da mensagem.
- MOB-010: Abertura e verificação de opção do dropdown.

**Resultado local:** 10 testes Android aprovados na mesma execução, distribuídos em seis arquivos.

### Evidências

O projeto está configurado para utilizar Allure Reporter e capturar screenshots em caso de falha.

## Integração contínua

O arquivo `.gitlab-ci.yml` contém:

- Job de testes de API com Node.js.
- Validação de tipos TypeScript.
- Execução de Vitest.
- Publicação de relatório JUnit.
- Job Android manual, dependente de runner com SDK, emulador e Appium.

**Status:** a pipeline ainda não foi executada no GitLab.

## Limitações conhecidas

- A execução Mobile foi validada no Android, não no iOS.
- Não houve execução Mobile em runner GitLab.
- A cobertura funcional implementada não comprova cobertura integral de todos os requisitos do desafio.
- O cadastro foi verificado quanto à apresentação e ao preenchimento de campos, sem submissão efetiva.
- Há alertas de segurança em dependências de desenvolvimento do ecossistema Appium que ainda precisam de tratamento.

## Segurança

- Dados sintéticos são utilizados nos testes.
- O arquivo `.env` não deve ser incluído no controle de versão.
- Relatórios e logs devem ser revisados antes do compartilhamento para evitar exposição de dados sensíveis.

## Documentação

O relatório técnico está disponível em `docs/RELATORIO_TECNICO.docx`.

## Especificações BDD

As especificações comportamentais estão disponíveis em:

- `bdd/api.feature`: 12 cenários de API, identificados de API-001 a API-012.
- `bdd/mobile.feature`: 10 cenários Mobile, identificados de MOB-001 a MOB-010.

Os arquivos utilizam Gherkin em português, com Dado/Quando/Então.

Cada cenário corresponde funcionalmente a um teste automatizado existente.
A automação é executada com Vitest (API) e WebdriverIO/Mocha (Mobile).
Os arquivos `.feature` não possuem integração com Cucumber nem step definitions.
