![logo_typeorm](https://user-images.githubusercontent.com/46737586/209253250-73ccc888-dd1e-462f-9b65-e53ff7c383a2.png)

&nbsp;

# API-VENDAS

API Restful com Node.js, Express, Typescript, TypeORM, Postgres, Redis, Docker, JWT, Celebrate . . .

## 🔨 Funcionalidades do projeto

Aplicação backend para gestão de vendas com funcionalidades para criação de cadastro de produtos, cadastro de clientes, pedidos de compras e uma completa gestão de usuários da aplicação, com autenticação via Token JWT, recuperação de senha por email, atualização de perfil, atualização de avatar, e muito mais. 


## ✔️ Tecnologias

- [TypeScript](https://www.typescriptlang.org/): Linguagem.
- [NodeJs](https://nodejs.org/en/): Ambiente de Execução.
- [Express](https://expressjs.com/): API Framework
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken): Autenticação JWT
- [Multer](https://github.com/expressjs/multer): Upload de Arquivos
- [Postgres](https://www.postgresql.org/): Banco de Dados
- [TypeORM](https://typeorm.io/#/): ORM
- [Eslint](https://eslint.org/): Padronização de código
- [tsyringe](https://github.com/microsoft/tsyringe): Lib de injeção de dependencias.
- [uuidv4](https://github.com/thenativeweb/uuidv4#readme): uuid.
- [celebrate](https://github.com/arb/celebrate): Celebrate.
- [redis](https://redis.io/): Redis.
- [Babel](https://babeljs.io/setup): Babel.
- [Docker Compose](https://docs.docker.com/compose/): Docker Compose.



## 📁 Acesso ao projeto
 
Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando no seu terminal (escolha um diretório apropriado):

```
git clone git@github.com:andrehahn05/typeorm-api-vendas.git
```
#### Crie arquivo .env baseado no .env.example
```
APP_SECRET=secret
APP_API_URL=http://localhost:3001
APP_WEB_URL=http://localhost:3000
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASS=
MAIL_DRIVER=ethereal
```
### Docker compose:
```
cd typeorm-api-vendas

docker-compose up

docker-compose down
```
#### Se houver erro de permissão 
```
cd typeorm-api-vendas

chmod +x .docker/entrypoint.sh
```

