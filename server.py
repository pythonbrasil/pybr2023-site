from livereload import Server


server = Server()


def run_server():
    server.watch('./')
    server.serve(root='./', host='0.0.0.0.')


if __name__ == '__main__':
    run_server()
