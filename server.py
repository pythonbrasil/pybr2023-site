from livereload import Server


server = Server()


def run_server():
    server.watch('src/*')
    server.serve(root='src')


if __name__ == '__main__':
    run_server()
