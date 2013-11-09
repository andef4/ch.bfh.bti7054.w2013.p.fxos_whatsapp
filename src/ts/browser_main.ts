import auth = require("./auth");
import credentials = require("./credentials");

function print(data: Uint8Array): string {
    var str: string = "";
    for(var i = 0; i < data.length; i++) {
        var c = data[i].toString(16);
        if (c.length == 1) {
            str += "0";
        }
        str += c;
        str += " ";
    }
    return str;
}

var packet = auth.auth(credentials.username, credentials.password);

//var str = print(packet);
//document.getElementById("content").innerHTML = str;

