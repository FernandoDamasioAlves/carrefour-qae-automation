# language: pt
@api
Funcionalidade: Gerenciamento de usuários e autenticação na API ServeRest
  Como profissional de qualidade
  Quero validar as operações de usuários e autenticação
  Para identificar comportamentos incorretos da API REST

  Contexto:
    Dado que a API ServeRest está disponível

  @API-001
  Cenário: Listar usuários cadastrados
    Quando consulto a lista de usuários
    Então a API deve responder com sucesso
    E deve retornar uma estrutura contendo usuários

  @API-002
  Cenário: Criar, consultar e excluir um usuário
    Dado que possuo dados sintéticos válidos e um e-mail único
    Quando cadastro um novo usuário
    Então devo conseguir consultar o usuário pelo identificador
    E devo conseguir excluir o usuário criado

  @API-003
  Cenário: Rejeitar cadastro sem nome
    Dado que possuo dados de cadastro sem o campo nome
    Quando tento cadastrar o usuário
    Então a API deve rejeitar o cadastro
    E deve informar a obrigatoriedade do nome

  @API-004
  Cenário: Rejeitar e-mail em formato inválido
    Dado que possuo dados de cadastro com e-mail inválido
    Quando tento cadastrar o usuário
    Então a API deve rejeitar o cadastro

  @API-005
  Cenário: Consultar usuário inexistente
    Dado que possuo um identificador de usuário inexistente
    Quando consulto esse identificador
    Então a API deve informar que o usuário não foi encontrado

  @API-006
  Cenário: Atualizar os dados de um usuário
    Dado que existe um usuário sintético cadastrado
    Quando atualizo os dados desse usuário
    Então a consulta deve apresentar os dados atualizados

  @API-007
  Cenário: Excluir usuário e confirmar sua remoção
    Dado que existe um usuário sintético cadastrado
    Quando excluo esse usuário
    Então uma nova consulta não deve encontrá-lo

  @API-008
  Cenário: Validar o contrato da listagem de usuários
    Quando consulto a lista de usuários
    Então a resposta deve respeitar o schema esperado da listagem

  @API-009
  Cenário: Validar o contrato de um usuário criado
    Dado que possuo dados sintéticos válidos
    Quando cadastro um usuário
    Então a resposta deve respeitar o schema esperado de usuário

  @API-010
  Cenário: Autenticar um usuário com credenciais válidas
    Dado que existe um usuário com credenciais válidas
    Quando realizo a autenticação
    Então a API deve confirmar a autenticação
    E deve disponibilizar um token de acesso

  @API-011
  Cenário: Rejeitar autenticação com senha incorreta
    Dado que existe um usuário cadastrado
    Quando tento autenticar com uma senha incorreta
    Então a API deve rejeitar a autenticação

  @API-012
  Cenário: Bloquear acesso a recurso protegido sem token
    Dado que não possuo um token de autenticação
    Quando tento acessar um recurso protegido
    Então a API deve negar o acesso
