## Como rodar:

- ``git clone https://github.com/Paulo-Piotto/pilot-app.git``
 - dentro da pasta do projeto: ``npm i --force`` 
 (é necesssário usar o force)
 - preencher .env:
  ```
REACT_APP_SERVER_URL='http://localhost:5000'
REACT_APP_PRIVATE_KEY="segredoxablau" - precisa ser o mesmo secret usado no back
```
 
 - Com o backend já rodando `npm start` para rodar
 - inicialmente como novo usuário você não terá acesso a nenhuma informação da aplicação, no app em produção essa alteração só pode ser concedida pelo dono da empresa, mas rodando um banco local você pode facilmente alterar suas permissóes alterando o banco, você vai precisar acessar o psql, conectar no banco e executar o comando:
```
 UPDATE users SET "role_id" = 3 WHERE email = 'lele@email.com';
```
  onde o role_id representa o seu nivel de permissão e email é o email usado na criação da conta
- para verificar os possíveis níveis de permissões você pode buscar no banco: 
```
 SELECT * FROM roles;
```
 e aplicar o nivel de permissão que quiser de acordo com o id, sendo o role "root" o com o mais alto nivel de permissões
- depois de alterar as permissões como desejar precisará fazer o logout e logar novamente
- feito isso pode navegar a vontade pelo app que foi criado como ferramenta de controle para uma empresa de construção civil, nele você registrar, apagar e editar clientes(obras), lojas(fornecedores), entradas, pedidos, funcionários, além de tambér conter um controle de presença de funcionários(ainda em desenvolvimento) e balanço financeiro. 


## user localStorage Data: 
 >  The storaged data once client its logged in the system
```json
    {
        "email": string,
        "iat": number,
        "name": string,
        "roleId": number, // represents the user autority
        "token": string
    }
```
