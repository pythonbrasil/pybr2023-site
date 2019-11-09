![Logo Python Brasil 2020 - Caxias do Sul/RS](docs/assets/images/logo-python-brasil-2020.png)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

> Página oficial da Python Brasil 2020 - Caxias do Sul/RS.

## Sobre o projeto

* **Tecnologias:** HTML, CSS, JS, jQuery, Bootstrap 4
* **Metodologias:** BEM - CSS
* **Server:** Python

## Rodando o projeto

Para facilitar o desenvolvimento, você pode ativar o servidor local que irá atualizando o navegador a cada atualização dos estáticos da página.

### Configurando o servidor

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

### Ativando o servidor

```sh
make local/run-server
```
