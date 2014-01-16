import platform = require("./platform_node");
import connection = require("../connection");

var conn = new connection.WhatsAppConnection(new platform.NodePlatform());

conn.onmessage = (from: string, message: string) => {
    console.log(from + ": " + message);
    conn.sendMessage(from, message);
}

conn.connect();
