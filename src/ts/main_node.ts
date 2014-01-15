import platform = require("./platform_node");
import connection = require("./connection");


var conn = new connection.WhatsAppConnection(new platform.NodePlatform());


conn.onconnect = () => {
    conn.fetchContacts();
}

conn.oncontacts = (contacts: Array<string>) => {
    contacts.forEach((contact: string) => {
        console.log(contact);
    });
}

conn.onmessage = (from: string, message: string) => {
    console.log(from + ": " + message);
    conn.sendMessage(from, message);
}

conn.connect();
