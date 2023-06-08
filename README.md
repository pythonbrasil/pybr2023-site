PyCaxias
============

![Logo PyCaxias](./util/logo2023-2.png)

[PyCaxias.org](https://pycaxias.com.br/)

Repositorio do site PyCaxias 

Evento da comunidade Python de Caxias do Sul, com intuito de popularizar e disseminar o conhecimento da linguagem python.

Projeto [Pelican](https://docs.getpelican.com/en/latest/)!

# Ambiente
```shell
git clone git@github.com:RedeNeural/PyCaxias.git;
cd PyCaxias
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

# Rodar
```shell
source .venv/bin/activate
invoke reserve
```

# Configuração

> 
> python decouple para configurar a url.
>

# Deploy
```shell
[dentro da env]$ invoke gh-pages
```