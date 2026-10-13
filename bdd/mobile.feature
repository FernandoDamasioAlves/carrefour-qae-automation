# language: pt
@mobile @android
Funcionalidade: Navegação, autenticação, cadastro e formulários Mobile
  Como usuário do aplicativo de demonstração
  Quero interagir com suas telas e componentes
  Para verificar o comportamento esperado da interface

  Contexto:
    Dado que o aplicativo WebdriverIO Native Demo está instalado
    E que existe uma sessão Appium ativa no Android

  @MOB-001
  Cenário: Exibir a tela inicial
    Quando acesso a aba inicial do aplicativo
    Então a tela inicial deve estar visível

  @MOB-002
  Cenário: Acessar a tela de Login
    Quando acesso a aba Login
    Então devo visualizar o campo de e-mail
    E devo visualizar o campo de senha
    E devo visualizar o botão de autenticação

  @MOB-003
  Cenário: Preencher credenciais de autenticação
    Dado que estou na tela de Login
    Quando informo um e-mail sintético
    E informo uma senha sintética
    Então o campo de e-mail deve apresentar o valor informado

  @MOB-004
  Cenário: Validar e-mail inválido
    Dado que estou na tela de Login
    Quando informo um e-mail em formato inválido
    E preencho o campo de senha
    Então devo visualizar uma mensagem de validação do e-mail

  @MOB-005
  Cenário: Acessar formulário de cadastro
    Quando acesso a aba Login
    E seleciono a opção Sign up
    Então devo visualizar os campos de e-mail e senha do cadastro

  @MOB-006
  Cenário: Exibir campos de cadastro
    Quando acesso o formulário de cadastro
    Então devo visualizar o campo de e-mail
    E devo visualizar o campo de senha
    E devo visualizar o campo de confirmação de senha

  @MOB-007
  Cenário: Preencher informações de cadastro
    Dado que estou no formulário de cadastro
    Quando preencho o e-mail com dados sintéticos
    E preencho os campos de senha e confirmação
    Então o campo de e-mail deve apresentar o valor informado
    E o campo de confirmação de senha deve permanecer visível

  @MOB-008
  Cenário: Preencher formulário e visualizar o resultado
    Dado que estou na tela Forms
    Quando digito um texto no campo de entrada
    Então o campo deve apresentar o texto digitado
    E o resultado do formulário deve apresentar o mesmo texto

  @MOB-009
  Cenário: Alternar o estado do switch
    Dado que estou na tela Forms
    E identifiquei o estado inicial do switch
    Quando aciono o switch
    Então a mensagem deve indicar o estado oposto
    E ao finalizar devo restaurar o estado inicial

  @MOB-010
  Cenário: Abrir o dropdown e verificar uma opção
    Dado que estou na tela Forms
    Quando abro o dropdown
    Então devo visualizar a opção "webdriver.io is awesome"
    E ao finalizar devo fechar o dropdown
