---
Title: Paralelismo sem GIL sub-interpretadores  no Python 3.12
Date: 2023-10-01 10:20
Description: Uma das grandes limitações do Python sempre foi que programas multi-threading usam um único núcleo da CPU. Com o Python 3.12, essa limitação é finalmente contornável, sem o uso de múltiplos processos.
Slug: paralelismo-sem-gil-sub-interpretadores-no-python-3-dot-12
Duration: 45
Speakers: João Sebastião de Oliveira Bueno
Speakers_biography: João S. O. Bueno é desenvolvedor Python desde 2001. Acompanhou a fundação da APYB, e desenvolveu projetos principalmente em Python em vários domínios da computação ao longo desse tempo.
Speakers_avatar: https://pretalx.com/media/avatars/ef459127edc89cc575d80a73cd8c567a_EWcoQ5K.jpg

---

Em tempo para a versão 3.12 foi aprovada a "PEP 684: A Per Interpreter GIL", culminando um trabalho de 8 anos do core developer Eric Snow, que permite, dentro de um mesmo processo Python, o uso em paralelo de vários núcleos de CPU de forma concorrente. A interface pública pra isso, PEP 554, não foi aprovada, mas a funcionalidade está lá, "escondida". O apresentador é autor de um pacote Python para possibilitar e simplificar o uso de sub-interpretadores como uma opção intermediária entre criação de sub-processos (sub-processing) e threads (que por conta da Global Interpreter Lock efetivamente limitam o código Python a um único núcleo).

A palestra apresenta a lib que permite o uso de sub-interpretadores com a GIL independente, de forma tão simples quanto o módulo threading, mostra alguns benchmarks, e explora possibilidades para finalmente ter programas Python fazendo uso integral de CPUs de múltiplos núcleos.