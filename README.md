 <div align="center">

<!-- ACUMINARE | BANNER SUPERIOR -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=190&color=0:29160F,35:573322,70:98613E,100:D6A875&section=header" />

<br>

# ACUMINARE

### 𝄞 INSTRUMENTOS MUSICAIS & EXPERIÊNCIA 𝄞

<sub>Onde cada instrumento encontra sua história e cada nota ganha vida.</sub>

<br><br>

<img src="https://img.shields.io/badge/PROJETO-2025-573322?style=for-the-badge" />
<img src="https://img.shields.io/badge/DEVELOPMENT-TEAM-98613E?style=for-the-badge" />
<img src="https://img.shields.io/badge/SEGMENTO-MUSICAL-D6A875?style=for-the-badge" />

<br><br>

**♫ A música foi a inspiração. A tecnologia foi o caminho. ♫**

<br>

[ SOBRE ](#sobre-o-acuminare) ·
[ HISTÓRIA ](#a-ideia-por-trás-do-projeto) ·
[ FUNCIONALIDADES ](#funcionalidades) ·
[ TECNOLOGIAS ](#tecnologias) ·
[ EQUIPE ](#nossa-equipe)

</div>

---

## 𝄞 Sobre o ACUMINARE

O **ACUMINARE** é um projeto web desenvolvido em 2025, com a proposta de criar uma plataforma voltada ao universo dos instrumentos musicais.

A aplicação foi idealizada para reunir recursos de apresentação e gerenciamento de instrumentos, produtos e categorias, proporcionando uma experiência organizada e uma estrutura administrativa para controle das informações.

Com uma identidade inspirada no universo musical, o projeto combina desenvolvimento web, organização de dados e funcionalidades administrativas em uma única aplicação.

Mais do que um projeto acadêmico, o ACUMINARE representa o início de uma experiência coletiva no desenvolvimento de sistemas.

## ♫ A ideia por trás do projeto

Toda boa ideia tem uma origem. A do ACUMINARE veio de algo que já fazia parte da realidade da nossa equipe: **a música**.

Como a maioria dos integrantes do grupo toca algum instrumento musical, surgiu a vontade de desenvolver um projeto que tivesse relação com um interesse em comum entre nós.

Foi assim que nasceu a proposta de criar um site voltado à comercialização e ao gerenciamento de instrumentos musicais.

A música, que já fazia parte dos nossos interesses, tornou-se a inspiração para nosso primeiro projeto de desenvolvimento em grupo.

O resultado foi uma experiência que uniu criatividade, tecnologia, colaboração e conhecimentos adquiridos durante nossa formação.

<blockquote>
  𝄞 Nem toda ideia começa com uma linha de código. Algumas começam com uma paixão em comum.
</blockquote>

## ◈ Funcionalidades do sistema

O ACUMINARE possui módulos destinados à apresentação e ao gerenciamento das informações da aplicação.

<details>
<summary><strong>01 · Instrumentos musicais</strong></summary>

Organização das informações relacionadas aos instrumentos musicais disponíveis na plataforma.

</details>

<details>
<summary><strong>02 · Produtos</strong></summary>

Gerenciamento dos produtos cadastrados, com informações e controle de estoque.

</details>

<details>
<summary><strong>03 · Categorias</strong></summary>

Organização dos produtos em categorias para facilitar a administração do catálogo.

</details>

<details>
<summary><strong>04 · Usuários</strong></summary>

Módulo destinado ao gerenciamento dos usuários cadastrados no sistema.

</details>

<details>
<summary><strong>05 · Movimentações</strong></summary>

Registro e acompanhamento das movimentações relacionadas ao estoque.

</details>

<details>
<summary><strong>06 · Dashboard administrativo</strong></summary>

Painel com indicadores e informações para acompanhamento da administração, incluindo dados de produtos, usuários, movimentações e estoque.

</details>

<details>
<summary><strong>07 · Mensagens</strong></summary>

Área destinada ao gerenciamento das mensagens recebidas pela aplicação.

</details>

## 𝄢 Universo visual e identidade

A identidade do ACUMINARE foi pensada para transmitir sofisticação e proximidade com o universo musical.

<div align="center">

| Cor | Identidade | Código |
|:---:|:---|:---:|
| <img src="https://placehold.co/35x35/29160F/29160F.png" /> | Café profundo | `#29160F` |
| <img src="https://placehold.co/35x35/573322/573322.png" /> | Marrom chocolate | `#573322` |
| <img src="https://placehold.co/35x35/98613E/98613E.png" /> | Caramelo | `#98613E` |
| <img src="https://placehold.co/35x35/C58B58/C58B58.png" /> | Cobre | `#C58B58` |
| <img src="https://placehold.co/35x35/D6A875/D6A875.png" /> | Champagne | `#D6A875` |
| <img src="https://placehold.co/35x35/F4E9DA/F4E9DA.png" /> | Off-white | `#F4E9DA` |

<br>

*Uma combinação inspirada na madeira dos instrumentos, nos tons quentes e na elegância dos detalhes musicais.*

</div>

## ◈ Tecnologias utilizadas

As tecnologias foram utilizadas para construir a estrutura da aplicação, desenvolver as interfaces e integrar o sistema ao banco de dados.

<div align="center">

### Back-end

<img src="https://skillicons.dev/icons?i=nodejs,express,js&theme=light" />

<br><br>

### Interface e visualização

<img src="https://skillicons.dev/icons?i=html,css,ejs&theme=light" />

<br><br>

### Banco de dados e ferramentas

<img src="https://skillicons.dev/icons?i=postgres,supabase,git,github,vscode&theme=light" />

</div>

| Tecnologia | Aplicação |
|:---|:---|
| JavaScript | Lógica e funcionalidades |
| Node.js | Ambiente de execução |
| Express.js | Servidor e gerenciamento de rotas |
| EJS | Renderização das páginas |
| HTML5 | Estrutura das interfaces |
| CSS3 | Estilização |
| PostgreSQL | Banco de dados relacional |
| Express Session | Gerenciamento de sessões |
| Git e GitHub | Versionamento e colaboração |

## ◈ Arquitetura do projeto

O sistema possui uma organização modular, separando as responsabilidades entre rotas, visualizações, arquivos públicos e configurações.

```text
ACUMINARE/
│
├── public/
│   └── Arquivos públicos
│
├── routes/
│   ├── admin.js
│   ├── produtos.js
│   ├── categorias.js
│   ├── usuarios.js
│   ├── movimentacoes.js
│   ├── instrumentos.js
│   └── mensagens.js
│
├── views/
│   ├── landing/
│   └── admin/
│
├── app.js
├── db.js
├── package.json
├── package-lock.json
└── .gitignore
```

<details>
<summary><strong>Entenda a estrutura do projeto</strong></summary>

| Diretório / Arquivo | Responsabilidade |
|:---|:---|
| `public/` | Arquivos estáticos e recursos públicos |
| `routes/` | Rotas e funcionalidades |
| `views/` | Páginas renderizadas com EJS |
| `app.js` | Inicialização do servidor |
| `db.js` | Configuração da conexão com o banco |
| `package.json` | Dependências e scripts |

</details>

## ◈ Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 01. Clonar o repositório

```bash
git clone https://github.com/gustavo7henrique/ACUMINARE.git
```

### 02. Acessar a pasta

```bash
cd ACUMINARE
```

### 03. Instalar as dependências

```bash
npm install
```

### 04. Configurar o banco de dados

Configure a conexão com o PostgreSQL conforme as informações utilizadas pela aplicação.

Recomenda-se armazenar as credenciais em variáveis de ambiente, evitando a exposição de informações sensíveis.

### 05. Executar a aplicação

```bash
npm start
```

Acesse pelo navegador:

```text
http://localhost:3000
```

<details>
<summary><strong>Problemas ao executar?</strong></summary>

- Verifique se o Node.js está instalado.
- Confira se todas as dependências foram instaladas.
- Verifique a conexão com o banco de dados.
- Confira as configurações do servidor.
- Consulte os scripts disponíveis no `package.json`.

</details>

## ♬ Conhecimentos e experiências

O desenvolvimento do ACUMINARE proporcionou a aplicação prática de diversos conceitos:

- Desenvolvimento de aplicações web.
- Programação back-end com Node.js.
- Criação de rotas com Express.
- Integração com banco de dados PostgreSQL.
- Renderização de páginas utilizando EJS.
- Organização de módulos e funcionalidades.
- Gerenciamento de informações e estoque.
- Trabalho colaborativo e divisão de responsabilidades.
- Planejamento e desenvolvimento de um projeto em equipe.

## 𝄞 Nossa equipe

Um projeto construído a partir de uma ideia em comum, diferentes contribuições e muita colaboração.

<div align="center">

<table>
<tr>
<td align="center" width="25%">

**Rafaela**

Desenvolvimento

</td>
<td align="center" width="25%">

**Gustavo Henrique**

Desenvolvimento

</td>
<td align="center" width="25%">

**Arthur**

Desenvolvimento

</td>
<td align="center" width="25%">

**Susany**

Desenvolvimento

</td>
</tr>
</table>

<br>

<img src="https://img.shields.io/badge/EQUIPE-4%20INTEGRANTES-573322?style=for-the-badge" />
<img src="https://img.shields.io/badge/ANO-2025-C58B58?style=for-the-badge" />

</div>

## ◈ Um projeto, uma história

O ACUMINARE foi nosso primeiro projeto de desenvolvimento em grupo, uma experiência que marcou o começo de uma nova etapa na nossa formação.

Foi a oportunidade de transformar uma ideia inspirada em algo que gostamos em uma aplicação real, enfrentando desafios, compartilhando conhecimentos e aprendendo a construir soluções em conjunto.

**Porque, assim como na música, no desenvolvimento cada pessoa tem sua contribuição. E é quando tudo se conecta que surge algo especial.**

---

<div align="center">

# ACUMINARE

### 𝄞 A música inspira. A tecnologia transforma. 𝄞

<br>

<a href="https://github.com/gustavo7henrique/ACUMINARE">
<img src="https://img.shields.io/badge/ACESSAR%20PROJETO-29160F?style=for-the-badge&logo=github&logoColor=D6A875" />
</a>

<br><br>

<sub>Desenvolvido em 2025 por Rafaela, Gustavo Henrique, Arthur e Susany.</sub>

<br><br>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=130&color=0:29160F,35:573322,70:98613E,100:D6A875&section=footer" />

</div>
