---
Title: Estimativa de similaridade em imagens usando Python
Date: 2023-10-01 10:20
Description: Entenda o desafio de estimatimar a similaridade de imagens usando uma Rede Siamesa com perda de trigêmeos. A rede siamesa será implementada utilizando a biblioteca tensorflow/keras.
Slug: estimativa-de-similaridade-em-imagens-usando-python
Duration: 180
Speakers: Wesin Ribeiro
Speakers_biography: Nascido na terra do açaí, sou engenheiro da computação, com mestrado e doutorado em computação aplicada, professor universitário e adoro programar em Python.
Speakers_avatar: https://pretalx.com/media/avatars/perfil2_uU5tMev.png

---

Uma rede siamesa é um tipo de arquitetura de rede que contém duas ou mais sub-redes idênticas usadas para gerar vetores de recursos para cada entrada e compará-los.
As redes siamesas podem ser aplicadas a diferentes casos de uso, como detecção de duplicatas, descoberta de anomalias e reconhecimento facial.
Este tutorial usa uma rede siamesa com três sub-redes idênticas (trigêmeos). Forneceremos três imagens ao modelo, onde duas delas serão semelhantes (amostras âncora e positivas) e a terceira não relacionada (um exemplo negativo). Nosso objetivo é que o modelo aprenda uma métrica capaz de estimar a similaridade entre as imagens.