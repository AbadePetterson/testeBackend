# Installation Guide

- Instale a última versão do Node.js
- Entre no diretório raiz do projeto
- Digite: `npm install` para instalar as dependências
- Digite: `npm run migrate` para criar as tabelas do banco de dados (SQLite3)
- Digite: `npm start` para iniciar o servidor (http://localhost:4001)


#Testar rodas
Por padrão a aplicação já está criando o usuário admin para se autenticar 
- Use o postman para testar  as rotas, pode ser baixado em [https://www.postman.com/downloads/]
- Importar a collection que contem os endpoints que permitirão criar o usuário, logar usuário e criar produtor e propriedade para usuário logado.
- Caso não consiga importar a collection as rotas são:
-- http://localhost:4001/accounts/login -> Serve para autenticar o usuário
-- http://localhost:4001/accounts/usuarios -> Serve para criar usuário
-- http://localhost:4001/business/produtores -> Serve para criar um Produtor 
-- http://localhost:4001/business/propriedades -> Serve para Criar uma Propriedade
