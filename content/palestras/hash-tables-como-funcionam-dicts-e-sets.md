---
Title: Hash tables como funcionam dicts e sets
Date: 2023-10-01 10:20
Description: Python é feito de dicionários: módulos, classes, e funções dependem deles para funcionar. Nessa palestra veremos como `dict` é implementado sobre _hash tables_, e suas mais recentes otimizações.
Slug: hash-tables-como-funcionam-dicts-e-sets
Duration: 45
Speakers: Luciano Ramalho
Speakers_biography: Autor do livro Python Fluente, publicado em 9 idiomas. Consultor na Thoughtworks Brasil. Co-fundador da Associação Python Brasil e do Garoa Hacker Clube.
Speakers_avatar: https://pretalx.com/media/avatars/LucianoRamalho2016-500x.jpg

---

Atributos de classes e de instâncias, espaços de nomes de módulos e argumentos nomeados de funções são alguns dos elementos fundamentais do Python representados na memória por dicionários. Até mesmo os tipos, funções e objetos embutidos são acessados através de um dicionário chamado `\_\_builtins\_\_.\_\_dict\_\_`.

Nesta palestra veremos:

\* O algoritmo e as estruturas de dados de tabelas de \_hash\_ começando por seu uso em `set`, que é mais simples de entender.

\* A otimização de memória que preserva a ordem de inserção de chaves em instâncias de `dict` (desde o Python 3.6) .

\* O layout do compartilhamento de chaves em dicionários que mantêm atributos de instância—o `\_\_dict\_\_` de objetos definidos pelo usuário (otimização implementada no Python 3.3).