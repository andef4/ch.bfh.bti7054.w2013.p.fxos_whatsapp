import packet_factory = require("packet_factory");



export function auth(username: string, password: string): Uint8Array {
    /*var data = WA.Network.PacketFactory.helloPacket();
    var str = print(data);
    
    var packet = WA.Network.PacketFactory.streamStartPacket();
    data = packet.serialize();
    str += print(data);
    
    packet = WA.Network.PacketFactory.featuresPacket();
    data = packet.serialize();
    str += print(data);
    */
    var packet = packet_factory.authPacket(username);
    var data = packet.serialize();
    return data;
}
