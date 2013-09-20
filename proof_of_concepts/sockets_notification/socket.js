function connect() {
    var socket = navigator.mozTCPSocket.open('147.87.46.10', 8000);
    socket.onopen = function() {
        socket.send('hello');
    }
    socket.ondata = function(event) {
        var notification = navigator.mozNotification.createNotification('TCPSocket', event.data);
        
        notification.onclick = function() {
           navigator.mozApps.getSelf().onsuccess = function(evt) {
                var app = evt.target.result;
                app.launch();
            };
        }
        
        notification.show();
    }
}
