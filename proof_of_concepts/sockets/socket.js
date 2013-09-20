function connect() {
    var socket = navigator.mozTCPSocket.open('147.87.46.10', 8000);
    socket.onopen = function() {
        socket.send('hello');
    }
    socket.ondata = function(event) {
        socket.send(event.data);
    }
}
