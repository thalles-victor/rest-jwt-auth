# Autenticação jwt no node com express e API rest

![](https://qbatu.net/wp-content/uploads/2023/01/jwt-1.png)

Este é um pequeno projeto que implementa uma api rest de autenticação usando o framework express e ele consiste em cadastrar usuários na plataforma e também fazer validações usando seu token de autenticação. Este projeto símples, porém ele trouxe vários conceitos como arquitetura limpa, solid testes unitários, validações, contenerização... Além de ferramentas ultilizadas de grande relevância no ecossistema node.

Algo que deve ser observado é que ele não ultiliza banco de dados e seim um repositório em memória, mas isto é proposital. Como estou implementando inversão de dependência que é um dos conceitos do SOLID, a ideia é que seja fácil a troca de repositório a qual vai ser ultilizado. Por mais que não esteja ultilizando qualquer banco de dados ou ORM ou algo semelhante, esta aplicação está muito flexível quando diz respeito de persistência de dados.

## Algumas stacks são
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)
![](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black)
![](https://img.shields.io/badge/Vitest-6E9F18.svg?style=for-the-badge&logo=Vitest&logoColor=white)
![](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)

- zod
- clear architecture
- SOLID
- unity test
- uuid
- bcrypt
- error handling


## Funcionalidades da aplicação

### Auth
- [x] Qualquer usuário poderá se cadastrar na plataforma
- [x] Qualquer usuário poderá fazer login usando as credenciais de forma correta
- [x] O email e o username devem ser únicos

### Post
- [x] Qualquer usuário cadastrado vai poder postar um post.
- [x] Qualquer pessoa estando cadastrado ou não vai poder ver todos os posts.
- [x] Somente o dono do post vai poder deleta-lo.

## Execução do projeto
antes de executar o projeto, é nescessário que na raiz do projeto tenha um arquivo .env criado contendo o seguinte conteúdo:

```env
JWT_SECRET=SRECRET #Chave secreta para assinar o token jwt.
```

O json web token usa uma chave que deve ser secreta para assinar ou validar o token, então, ao subir o projeto para produção, deve se colocar uma chave forte para que não seja viável quebrar o token de autenticação.

### execução de desenvolvimento: via node
O projeto pode ser executado de duas formas, a primeira é via node tradicional o que é nescessário ter o node instalado no seu sistema operacional:

```console
npm install
```
para instalar as dependências do projeto. E depois exeutar o servidor com o comando:

```console
npm run dev
```

O servidor irá executar em: http://localhost:3000

### execução de desenvolvimento: via docker

```console
docker compose up
```

E da mesma forma o servidor vai executar em: http://localhost:3000, só que desta vez, rodando em um container docker.

### exeucução de build e produção

Ao subir o projeto para produção é necesário transpilar os arquivos typescript para javascript, para isso rode o comando: 
```console
npm run build
```
Ao gerar a build do projeto, ele vai criar uma pasta na raiz chamada de build, dentro dela tem um arquivo server.js que será o nosso arquivo principal,
para executar o projeto em produção basta rodar o comando:

```console
npm run start
```


## Testes
![](./git/assets//test.png)
Os testes são uma parte muito importante da aplicação e é através deles que previnimos bugs e damos mais segurança ao projeto validando entradas, regras de negócio e muito mais. Os testes unitários nessa aplicação foi implementado ultilizado o [vitest](https://vitest.dev/) que é uma ferramenta semelhante ao jest porém muito mais rápida e mais eficiente.

Se você for executar no seu SO (sistema operacional), basta rodar o comando:

```console
npm run test
```

caso você queira executar os testes via container, primeiro você tem que acessar o bash do container do projeto através do comando:

```
docker exec -it rest-jwt-auth-server /bin/bash
```

e depois rodar os testes com:

```
npm run test
```



## Documentação da API

![swagger doc api](./git/assets/rest-jwt-auth-swagger-doc.png)

ao executar o servidor, você pode consultar a documentação em http://localhost:3000

eu ultilizei o [swagger ui express](https://github.com/scottie1984/swagger-ui-express) que é uma ferramenta para documentar APIs Rest que carrega a [open api](https://www.openapis.org/) que é uma ferramenta de teste muito últil para ajudar no entendimento e consumo da api. O servidor swagger está disponível no domínio da aplicação.

