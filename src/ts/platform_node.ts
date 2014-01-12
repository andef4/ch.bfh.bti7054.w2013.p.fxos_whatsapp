/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");
import net = require("net");

export class NodePlatform implements IPlatform {
    getCrypto() {
        return new NodeCrypto();
    }
    getContacts() {
        return new NodeContacts();
    }
    getSocket() {
        return new NodeSocket();
    }
    getCredentials() {
        return new NodeCredentials();
    }
}

function arrayToBuffer(array: Uint8Array): NodeBuffer {
    var buffer = new Buffer(array.length);
    for(var i = 0; i < array.length; i++) {
        buffer[i] = array[i];
    }
    return buffer;
}

function bufferToArray(buffer: NodeBuffer): Uint8Array {
    var array = new Uint8Array(buffer.length);
    for(var i = 0; i < buffer.length; i++) {
        array[i] = buffer[i];
    }
    return array;
}


export class NodeCrypto implements ICrypto {
    PBKDF2(password: string, salt: string, keySize: number, iterations: number): string {
        return CryptoJS.PBKDF2(password, salt, {keySize: keySize, iterations: iterations}).toString(CryptoJS.enc.Latin1);
    }
}

export class NodeContacts implements IContacts {
    getContacts(): Array<String> {
        return null;
    }
}

export class NodeSocket implements ISocket {
    /*
    var socket = net.connect(constants.PORT, constants.HOST);
    socket.on("connect", function() {
    socket.on("data", function(data: NodeBuffer) {
    socket.write(arrayToBuffer(packet.serialize()));
    */
    ondata: {(data: Uint8Array): void};
    onconnect: {(): void};
    
    connect(host: string, port: number): void {
        
    }
    write(data: Uint8Array): void {
        
    }
    
}

export class NodeCredentials implements ICredentials {
    getPassword(): string {
        return "";
    }
    getUsername(): string {
        return "";
    }
}

