# Banco Carrefour — Desafio Técnico QAE

Desenvolvi este projeto para os desafios de automação de testes de API REST e Mobile Android do Banco Carrefour. Organizei as suítes de forma independente, com documentação, cenários rastreáveis e evidências de execução.

## Estrutura

- `api-tests/`: clientes HTTP, massa de dados, schemas e testes de API.
- `mobile-tests/`: testes Android com Page Object Model e configuração Appium.
- `bdd/`: especificações de cenários em Gherkin.
- `docs/RELATORIO_TECNICO.docx`: relatório técnico e matriz de testes.
- `.github/workflows/qa-automation.yml`: CI/CD de API e Android no GitHub Actions.
- `.gitlab-ci.yml`: pipeline adicional de API no GitLab.
- `scripts/run-android-ci.sh`: inicialização do Appium e execução Android em CI.

## Automação de API

Utilizei **TypeScript, Vitest, Supertest e Zod** para validar a [ServeRest](https://serverest.dev). Organizei as chamadas HTTP em clientes reutilizáveis, os dados sintéticos na fábrica `makeUser` e a validação das respostas em schemas.

Cobri operações de criação, consulta, listagem, atualização e exclusão de usuários; validação de campos obrigatórios, autenticação e autorização por token; contratos de resposta e casos negativos. Também desenvolvi dois testes de **rate limiting** em uma aplicação Express local usando `express-rate-limit`, incluindo bloqueio HTTP 429 da 101ª requisição e recuperação após a janela de teste. Essa validação se refere ao middleware controlado, e não à política da ServeRest pública.

**Resultado:** 23 testes aprovados em sete arquivos, com validação TypeScript e saída JUnit. Executei a suíte localmente, no GitLab CI/CD e no GitHub Actions.

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

As evidências locais estão preservadas em Allure, e a execução em CI publica os resultados como artefatos do GitHub Actions. O teste de cadastro valida apresentação e preenchimento dos campos, sem concluir uma criação de conta.

## Integração contínua e evidências

Configurei o **GitHub Actions** para executar automaticamente os testes de API e Mobile Android. A pipeline utiliza Node.js, Java, Appium e um emulador Android provisionado durante o próprio workflow.

Na suíte de API, executo `npm ci`, validação TypeScript e Vitest. Na suíte Mobile, preparo o emulador Android, instalo o aplicativo demonstrativo e executo os cenários com WebdriverIO e Appium.

**Resultado comprovado no GitHub Actions:**

- API: **23 testes aprovados** em 7 arquivos.
- Mobile Android: **10 testes aprovados** em 6 arquivos.
- **33 testes aprovados no total**, com os dois jobs concluídos com sucesso.
- Relatórios **JUnit e Allure** publicados como artefatos da execução.

**Execução de referência:** [GitHub Actions — API e Android](https://github.com/FernandoDamasioAlves/carrefour-qae-automation/actions/runs/38601257714).

Também configurei o GitLab CI/CD, onde validei a execução automatizada da suíte de API e a publicação do JUnit.

### Execução pela pipeline

O workflow está em `.github/workflows/qa-automation.yml`, configurado para a branch `main` e com acionamento manual (`workflow_dispatch`).

Os artefatos de cada execução podem ser consultados na aba **Actions**, dentro do workflow correspondente.

## Especificações e documentação

Registrei os comportamentos em `bdd/api.feature` e `bdd/mobile.feature` e relaciono os identificadores aos testes no relatório técnico. Os arquivos Gherkin são especificações de apoio; os testes são executados por Vitest e por WebdriverIO/Mocha, sem integração com Cucumber.

**Total comprovado:** 23 execuções de API e dez de Android aprovadas. Os resultados representam a cobertura dos cenários implementados, não uma medição de cobertura do código-fonte da API pública.

O relatório completo está em [`docs/RELATORIO_TECNICO.docx`](docs/RELATORIO_TECNICO.docx).

## Cuidados com dados de teste

Utilizei dados sintéticos e mantive o arquivo `.env` fora do controle de versão. O arquivo `.env.example` contém somente parâmetros de referência.
