#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Python Brasil'

SITENAME = 'Python Brasil 2023'
SITEYEAR = 2023
SITEURL = ''
PATH = 'content'
SITEMAP = {
    'format': 'xml',
    'exclude': ['tags.html', 'categories.html', 'authors.html', 'archives.html']
}

ARTICLE_ORDER_BY = 'date'
TIMEZONE = 'America/Sao_Paulo'

DEFAULT_LANG = 'pt-br'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/{slug}.atom.xml'
USE_FOLDER_AS_CATEGORY = True
# OLD_EVENTS
OLD_EVENTS = []
# OLD_EVENTS
MENU = [
    ('#inicio', 'Início', True),
    ('#evento', 'Sobre o evento', True),
    ('#keynotes', 'Keynotes', True),
    ('#programacao', 'Programação', True),
    ('#trabalhos', 'Chamada de Trabalhos', True),
    ('#patrocinadores', 'Patrocinadores', True),
]

# Social widget
SOCIAL = {
    'twitter':'https://twitter.com/pythonbrasil',
    'instagram':'https://instagram.com/pythonbrasil',
    'linkedin':'https://www.linkedin.com/company/apyb/',
    'youtube':'https://www.youtube.com/c/pythonbrasiloficial',
    'facebook':'https://www.facebook.com/pythonbrasil',
    'flickr':'https://www.flickr.com/pythonbrasil',
    'telegram':'https://t.me/pythonbrasil',
    'email':'mailto:eventos@python.org.br',
}

DEFAULT_PAGINATION = False
SITE_META_KEYWORDS = f"Python Brasil, Python Brasil {SITEYEAR}, evento python, comunidade, evento, Programação, Python"
SITE_META_DESCRIPTION = "Python Brasil é o maior evento sobre linguagem de programação Python do Brasil. Feito pela comunidade para a comunidade, tem o objetivo de difundir a linguagem, promover a troca de experiências e manter a comunidade crescendo igualmente em público e impacto social."

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

EVENTO = {
    'inscricao':'https://www.eventbrite.com.br/e/python-brasil-2023-registration-576537738897',
    'submissao':'https://pretalx.com/python-brasil-2023/cfp',
    'data_evento': 'DE 30 OUTUBRO À 05 NOVEMBRO',
    'cidade': 'Caxias do Sul, RS',
    'kit_divulgacao': '/theme/media_kits/frame.zip'
}

PLANOS = {
    'pt_br':'/theme/media_kits/Python_Brasi_2023_PT_Br.pdf',
    'en':'/theme/media_kits/Python_Brasil_2023_En.pdf',
}
