# Aplicação backend

Esse serviço foi desenvolvido com o objetivo de integrar ao frontend.

## Descrição
Essa aplicação possui as seguintes funcionalidades.

### Gestão de usuário

- [x] Registro
- [x] Recuperar metadados do usuário autenticado
- [x] Gerar token JWT

### Gestão de produtos

- [x] Registro
- [x] Listagem
- [x] Atualização de um produto
- [x] Recuperar produto específico

### Gestão de Shopping

- [x] Compra de produtos
- [x] Listagem de compras de um usuário com base em seu token JWT

## Tecnologias Utilizadas

- Node.js
- Express.js
- AWS Cognito
- AWS dynamodb
- AWS api gateway
- AWS lambda
- Terraform
- Github actions

## Configuração

### Pré-requisitos

- Node.js instalado
- Conta na AWS com acesso aos serviços utilizados (Para visualização dos recursos)

### Instalação

1. Clone o repositório: `https://github.com/matheus-lucena/stone-api`
2. Instale as dependências: `npm install`
3. Copiar arquivo .env.example com o nome .env
4. Executar o servidor `npm run start`
5. Collection postman dos endpoints https://github.com/matheus-lucena/stone-api/blob/master/postman.json.


### Realizando deploy

Para realizar o deploy foi utilizado o github actions, onde todo procedimento é de forma automatica e sem interferencia humana. Um ponto importante que a etapa de testes também está definida nos actions, garantindo assim uma manutenção da aplicação.

#### Configuração do github actions

1. Primeiro passo é a configuração do openid em sua conta AWS: [Documentação oficial github](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws)
2. Criação de uma role com permissão de criação dos recursps requisitados para o repositório da aplicação
3. Configuração da role no workflow, juntamente com as configurações de permissions: [Documentação oficial github](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-permissions-settings)

## Informações importantes

### Autenticação
O fluxo de autenticação utiliza o cognito, onde todos registros de informações do usuário estarão lá armazenadas.
Para acessar endpoints que necessitam autenticação foi criado uma integração, utilizando o sdk da AWS, que realiza chamadas no serviço. Onde caso um token seja inválido a requisição falhara antes de executar algum código após a camada do middleware da aplicação.


### Banco de dados
Foram criadas duas tabelas dynamodb, onde as tabelas possuem GSI para optimizar a performance de consultas.

#### Produtos
Como essa tabela terá poucos registros, por ser uma refêrencia as máquinas que os clientes podem vim a adquirir, foi criado um GSI para listagem de produtos ativos.

#### Shop
Essa tabela armazena o histórico de compras dos clientes, com isso pode vir a crescer de forma bem rápida, com isso para filtrar as compras de um cliente de forma correta, foi criado uma GSI com a chave principal sendo o client_id, com isso conseguimos trazer todo histórico de compras de um usuário.


# Melhorias mapeadas

- Criação de uma range juntamente com o GSI de clientes na tabela Shop, com isso conseguiriamos filtrar as compras por dia.
- Implementação de um cache na camada de autenticação, evitando chamadas desnecessárias ao serviço cognito da AWS, também criando uma camada de resiliência no serviço.
- Criar grupos o aws cognito, para segregar usuários administrativos e clientes da companhia, pois atualmente qualquer usuário autenticado conseguirá criar produtos, sendo uma alternativa temporaria desabilitar o endpoint de criação após todos registros serem criados.
- Implementar um backend s3 para armazenamento das fotos, pois atualmente está sendo armazenado uma URL, oq pode ocausionar problemas por depêndencias externas.
