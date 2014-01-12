/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");
import net = require("net");
import credentials = require("./credentials");

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
    private socket: net.NodeSocket;
    ondata: {(data: Uint8Array): void};
    onconnect: {(): void};
    
    connect(host: string, port: number): void {
        this.socket = net.connect(port, host);
        this.socket.on("connect", () => this.onconnect());
        this.socket.on("data", (data: NodeBuffer) => this.ondata(NodeSocket.bufferToArray(data)));
    }
    write(data: Uint8Array): void {
        this.socket.write(NodeSocket.arrayToBuffer(data));
    }
    
    static arrayToBuffer(array: Uint8Array): NodeBuffer {
        var buffer = new Buffer(array.length);
        for(var i = 0; i < array.length; i++) {
            buffer[i] = array[i];
        }
        return buffer;
    }
    
    static bufferToArray(buffer: NodeBuffer): Uint8Array {
        var array = new Uint8Array(buffer.length);
        for(var i = 0; i < buffer.length; i++) {
            array[i] = buffer[i];
        }
        return array;
    }

}

export class NodeCredentials implements ICredentials {
    getUsername(): string {
        return credentials.username;
    }
    getPassword(): string {
        return credentials.password;
    }
}

