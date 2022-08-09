# Desafio Peoplefy

## Sobre o Projeto

O projeto é um lista de personagem do animação Rick and Morty, onde é possível a realização da busca dos personagens pelo nome e status.Foi utilizado uma API REST já existente, disponiblizada [aqui](https://rickandmortyapi.com/graphql)

O projeto foi hospedado no Google Firebase e pode ser acessado por [aqui](https://peoplefy.netlify.app/)

**Tecnologias**: 
- **VueJs** - na versão 3 (utilizando a [composition-api](https://composition-api.vuejs.org/) + typescript) (Framework JavaScript).
- **[Netfly](https://www.netlify.com/)** - para hospedagem do front-end no Netfly.
- **[Tawilwomdcss](https://tailwindcss.com/)** 
- **[Vite](https://vitejs.dev/)** 
- **[Pinia](https://pinia.vuejs.org/)** 
- **Github Actions** - Implementado ferramenta de CI para deploy automático no Firebase Hosting.

## Requisitos necessários

É necessário a instalação do NodeJs 14.X e GIT para inicialização do projeto.

- **Instalação do NodeJs:** [Acesse aqui](https://nodejs.org/en/download/) e realize o download do NodeJs 14.X
- **Instalação do GIT:** Realize o download [aqui](https://git-scm.com/downloads) e realize a instalção.

Realizado as configurações vamos para a próxima etapa.

## Incializando o projeto

Acesse o [repositório](https://github.com/lmaiaa/peoplefy.git) do meu desafio

Execute o comando

```
git clone https://github.com/lmaiaa/peoplefy.git
```

Acesse a pasta clonada e instale as dependências

```
cd peoplefy
npm install

```

Após isso o projeto está pronto para ser inicializado.
Para inicializar do front-end execute o comando:

```
npm run dev
```

## Projeto inicializado

Ao inicializar o projeto:

- O front-end pode ser acessado em: **http://localhost:5173**

## Melhorias futuras

- Testes unitários;
- Teste E2E;
- Novos filtros
