#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Rede Neural'

SITENAME = 'PyCaxias 2023'
SITEYEAR = 2023

SITEURL = '/'

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

# OLD_EVENTS
OLD_EVENTS = ()
# OLD_EVENTS
MENU = (
    ('#intro','Início', True),
    ('#about','Sobre', False),
    ('#schedule','Agenda', False),
    ('#inscricao','Inscrição', False),
    ('#supporters','Patrocinadores', False),
    ('#contact','Contato', False),
)

# Social widget
SOCIAL = {
    'instagram':'https://www.instagram.com/pycaxias',
    'facebook':'https://www.facebook.com/pycaxias',
}

DEFAULT_PAGINATION = False
SITE_META_KEYWORDS = f"PyCaxias {SITEYEAR}, evento python, caxias do sul, evento caxias do sul, python, pycaxias, comunidade python caxias do sul, python rio grande do sul, comunidade"
SITE_META_DESCRIPTION = "Evento da comunidade Python de Caxias do Sul, com intuito de popularizar e disseminar o conhecimento da linguagem python"

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

EVENTO = {
    "data": "11/03/2023",
    "local": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
    "auditorio": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
    
    "cadastramento_inicio": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
    "cadastramento_fim": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
    "Cadastramento_link": 'https://www.sympla.com.br/pycaxias-2023__1873136?share_id=5rmrc',

    "c4f_inicio": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
    "c4f_fim": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
    "c4f_link": "11 de Março, Universidade de Caxias do Sul, Caxias do Sul",
}