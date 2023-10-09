# -*- coding: utf-8 -*-

import os
import shutil
import sys
import datetime

from invoke import task
from old.runner import move_old_to_output
from util.myfuntions import move_cname
from pelican.server import ComplexHTTPRequestHandler, RootedHTTPServer
from pelican.settings import DEFAULT_CONFIG, get_settings_from_file
from util.pretalx_utils import generate_content

SETTINGS_FILE_BASE = 'pelicanconf.py'
SETTINGS = {}
SETTINGS.update(DEFAULT_CONFIG)
LOCAL_SETTINGS = get_settings_from_file(SETTINGS_FILE_BASE)
SETTINGS.update(LOCAL_SETTINGS)

CONFIG = {
    'settings_base': SETTINGS_FILE_BASE,
    'settings_publish': 'publishconf.py',
    'deploy_path': SETTINGS['OUTPUT_PATH'],
    'github_pages_branch': 'gh-pages',
    'commit_message': "'Publish site on {}'".format(datetime.date.today().isoformat()),
    'port': 8000,
}


@task
def build_webpack(c):
    """Builds the css and javascript assets and move to theme/"""
    sys.stderr.write('Generating the css and javascript assets...\n')
    c.run('docker compose build --no-cache')
    c.run('docker compose up -d')
    c.run('docker cp event_theme:/app/theme/static/ ./theme/')
    c.run('docker compose down -v')


@task
def clean(c):
    """Remove generated files"""
    if os.path.isdir(CONFIG['deploy_path']):
        shutil.rmtree(CONFIG['deploy_path'])
        os.makedirs(CONFIG['deploy_path'])


@task
def build(c):
    """Build local version of site"""
    build_webpack(c)
    c.run('pelican -t theme -s {settings_base}'.format(**CONFIG))
    move_old_to_output()
    move_cname()


@task
def rebuild(c):
    """`build` with the delete switch"""
    c.run('pelican -d -t theme -s {settings_base}'.format(**CONFIG))


@task
def regenerate(c):
    """Automatically regenerate site upon file modification"""
    c.run('pelican -r -t theme -s {settings_base}'.format(**CONFIG))


@task
def serve(c):
    """Serve site at http://localhost:$PORT/ (default port is 8000)"""

    class AddressReuseTCPServer(RootedHTTPServer):
        allow_reuse_address = True

    server = AddressReuseTCPServer(
        CONFIG['deploy_path'],
        ('', CONFIG['port']),
        ComplexHTTPRequestHandler)

    sys.stderr.write('Serving on port {port} ...\n'.format(**CONFIG))
    server.serve_forever()


@task
def reserve(c):
    """`build`, then `serve`"""
    build(c)
    serve(c)


@task
def preview(c):
    """Build production version of site"""
    build_webpack(c)
    c.run('pelican -t theme -s {settings_publish}'.format(**CONFIG))
    move_old_to_output()
    move_cname()


@task
def livereload(c):
    """Automatically reload browser tab upon file modification."""
    from livereload import Server
    build(c)
    server = Server()
    # Watch the base settings file
    server.watch(CONFIG['settings_base'], lambda: build(c))
    # Watch content source files
    content_file_extensions = ['.md', '.rst']
    for extension in content_file_extensions:
        content_blob = '{0}/**/*{1}'.format(SETTINGS['PATH'], extension)
        server.watch(content_blob, lambda: build(c))
    # Watch the theme's templates and static assets
    theme_path = SETTINGS['THEME']
    server.watch('{}/templates/*.html'.format(theme_path), lambda: build(c))
    static_file_extensions = ['.css', '.js', '.scss']
    for extension in static_file_extensions:
        static_file = '{0}/static/**/*{1}'.format(theme_path, extension)
        server.watch(static_file, lambda: build(c))
    # Serve output path on configured port
    server.serve(port=CONFIG['port'], root=CONFIG['deploy_path'])


@task
def to_old(c):
    """generate old year of a master branch"""
    folder = 'old/{}/'.format(SETTINGS.get('SITEYEAR'))
    c.run(
        'pelican -t theme -s {settings_base} -o {folder}'.format(**CONFIG, folder=folder))


@task
def generate_content_from_server(c):
    """ Generate the content from Pretalx site, using the api endpoint"""
    generate_content()


@task
def gh_pages(c):
    """Publish to GitHub Pages"""
    preview(c)
    c.run('ghp-import -b {github_pages_branch} '
          '-m {commit_message} '
          '{deploy_path} -p -c 2023.pythonbrasil.org.br'.format(**CONFIG))
