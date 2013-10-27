
module WA.Auth {
    
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
    
    export function auth(username: string, password: string) {
        var data = WA.Network.PacketFactory.helloPacket();
        var str = print(data);
        
        var packet = WA.Network.PacketFactory.streamStartPacket();
        data = packet.serialize();
        str += print(data);
        
        packet = WA.Network.PacketFactory.featuresPacket();
        data = packet.serialize();
        str += print(data);
        
        packet = WA.Network.PacketFactory.authPacket(username);
        data = packet.serialize();
        str += print(data);

        document.getElementById("content").innerHTML = str;
    }
}

WA.Auth.auth("1234", "1234");



