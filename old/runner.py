import shutil
from os import path, removedirs
from pelicanconf import OLD_EVENTS


def move_old_to_output():

    for ano, url in OLD_EVENTS:
        if path.exists(f'./output/{ano}'):
            shutil.rmtree(f'./output/{ano}')
        shutil.copytree(f'./old/{ano}', f'./output/{ano}')

if __name__ == '__main__':
    move_old_to_output()