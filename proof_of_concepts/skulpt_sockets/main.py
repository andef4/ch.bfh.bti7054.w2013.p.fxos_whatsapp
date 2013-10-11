import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('localhost', 8000))

s.send('hello')

while True:
    d = s.recv(1024)
    s.send(d)