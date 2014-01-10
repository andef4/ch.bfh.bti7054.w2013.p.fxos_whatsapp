import platform = require("./platform_node");
import connection = require("./connection");


var conn = new connection.WhatsAppConnection(new platform.NodePlatform());

conn.connect();



//auth.auth(credentials.username, credentials.password);
