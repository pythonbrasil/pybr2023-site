![Logo Python Brasil 2020 - Caxias do Sul/RS](docs/images/logo-python-brasil-2020.jpg)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

> Página oficial da Python Brasil 2020 - Caxias do Sul/RS.

## Sobre o projeto

* **Tecnologias:** HTML, CSS (SCSS), JS, jQuery e Bootstrap 4
* **Metodologias:** BEM - CSS
* **Servidor:** Python

## Rodando o projeto

Instale as dependências do projeto rodando:

```sh
npm install
```

Ou - é recomendado essa opção:

```sh
yarn
```

Para facilitar o desenvolvimento, você pode ativar o servidor local que irá atualizar o navegador a cada alteração dos estáticos da página.

### Configurando o servidor pela primeira vez

**Caso já tenha Virtualenv instalado, por favor, pule essa etapa:**

```sh
pip install virtualenv
```

Depois:

```sh
make local/create-env
```

```sh
source venv/bin/activate
```

```sh
make local/install
```

#### Ativando o servidor

```sh
make local/run-server
```

### Encerrando o servidor

```sh
deactivate
```

### Ativando o servidor (após ter encerrado, fechado e aberto novamente)

No diretório do projeto:

```sh
source venv/bin/activate
```

```sh
make local/run-server
```

## Alterando os estilos da página

Este projeto utiliza SASS (SCSS). Os arquivos a serem alterados estão no seguinte diretório:

```
.
├── assets
│   ├── sass
│   |    └── layout.scss
│   |    └── main.scss
```

Antes de alterar os arquivos, rode o seguinte comando:

```sh
sass --watch assets/sass/main.scss:assets/css/custom.css
```

Em quaisquer alterações o seguinte arquivo será alterado, arquivo esse que é o que a página consome:

```
.
├── assets
│   ├── css
│   |    └── custom.scss
```
