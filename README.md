# Banco Carrefour — Desafio Técnico QAE

Desenvolvi este projeto para os desafios de automação de testes de API REST e Mobile Android do Banco Carrefour. Organizei as suítes de forma independente, com documentação, cenários rastreáveis e evidências de execução.

## Estrutura

- `api-tests/`: clientes HTTP, massa de dados, schemas e testes de API.
- `mobile-tests/`: testes Android com Page Object Model e configuração Appium.
- `bdd/`: especificações de cenários em Gherkin.
- `docs/RELATORIO_TECNICO.docx`: relatório técnico e matriz de testes.
- `.gitlab-ci.yml`: integração contínua e publicação do JUnit da API.

## Automação de API

Utilizei **TypeScript, Vitest, Supertest e Zod** para validar a [ServeRest](https://serverest.dev). Organizei as chamadas HTTP em clientes reutilizáveis, os dados sintéticos na fábrica `makeUser` e a validação das respostas em schemas.

Cobri operações de criação, consulta, listagem, atualização e exclusão de usuários; validação de campos obrigatórios, autenticação e autorização por token; contratos de resposta e casos negativos. Também desenvolvi dois testes de **rate limiting** em uma aplicação Express local usando `express-rate-limit`, incluindo bloqueio HTTP 429 da 101ª requisição e recuperação após a janela de teste. Essa validação se refere ao middleware controlado, e não à política da ServeRest pública.

**Resultado:** 23 testes aprovados em sete arquivos, com validação TypeScript e saída JUnit. Executei a suíte localmente e no GitLab CI/CD.

### Como executar

```bash
cd api-tests
npm ci
npm run typecheck
npm test
```

A variável `API_BASE_URL` permite configurar a URL do serviço; o padrão é `https://serverest.dev`. O relatório é gerado em `api-tests/reports/junit.xml`.

## Automação Mobile Android

Utilizei **WebdriverIO, Appium, UiAutomator2, Mocha e Page Object Model** para automatizar o aplicativo **WebdriverIO Native Demo App v2.2.0**.

Implementei dez cenários: exibição da tela inicial (MOB-001), acesso ao login (MOB-002), preenchimento de credenciais (MOB-003), validação de e-mail inválido (MOB-004), navegação até cadastro (MOB-005), verificação de campos (MOB-006), preenchimento de cadastro (MOB-007), entrada e exibição de texto (MOB-008), mudança de estado de switch (MOB-009) e interação com dropdown (MOB-010).

**Resultado:** dez testes Android aprovados em seis arquivos, com relatório Allure. Configurei screenshots automáticos em caso de falha; na execução consolidada, todos os testes passaram. O Allure registra Android 15, emulador `Carrefour_QAE_API35`, versão do aplicativo, ferramentas e tipo de execução.

### Pré-requisitos e execução

1. Preparar Node.js, Java JDK, Android SDK, emulador e Appium com driver UiAutomator2.
2. Instalar no emulador o Native Demo App v2.2.0 (`com.wdiodemoapp`).
3. No diretório `mobile-tests`, executar `npm ci`, copiar `.env.example` para `.env` e configurar os dados sintéticos.
4. Confirmar o dispositivo com `adb devices`, iniciar `npx appium` e executar `npm run test:android`.

As evidências da execução estão reunidas no pacote Allure da entrega. O teste de cadastro valida apresentação e preenchimento dos campos, sem concluir uma criação de conta.

## Integração contínua e evidências

Configurei a pipeline em `.gitlab-ci.yml`. No job `api_tests`, o runner instala as dependências com `npm ci`, verifica os tipos, executa os testes e publica `reports/junit.xml` como artefato.

**Pipeline de referência:** [#2944807970](https://gitlab.com/fernando-damasio-group/carrefour-qae-automation/-/pipelines/2944807970) — 23 testes de API aprovados. Também executei pipelines posteriores com aprovação.

A suíte Android foi executada e validada localmente. O arquivo de CI contém um job Mobile que depende de um runner com SDK, emulador e Appium; não há evidência de execução desse job no GitLab. A execução iOS não integrou a validação, conforme alinhamento da entrega com a recrutadora.

## Especificações e documentação

Registrei os comportamentos em `bdd/api.feature` e `bdd/mobile.feature` e relaciono os identificadores aos testes no relatório técnico. Os arquivos Gherkin são especificações de apoio; os testes são executados por Vitest e por WebdriverIO/Mocha, sem integração com Cucumber.

**Total comprovado:** 23 execuções de API e dez de Android aprovadas. Os resultados representam a cobertura dos cenários implementados, não uma medição de cobertura do código-fonte da API pública.

O relatório completo está em [`docs/RELATORIO_TECNICO.docx`](docs/RELATORIO_TECNICO.docx).

## Cuidados com dados de teste

Utilizei dados sintéticos e mantive o arquivo `.env` fora do controle de versão. O arquivo `.env.example` contém somente parâmetros de referência.
