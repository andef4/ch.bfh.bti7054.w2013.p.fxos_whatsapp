/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");
import net = require("net");
import credentials = require("./credentials");
import helpers = require("./helpers");
import jsSHA = require("jssha");

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
        var pw = CryptoJS.enc.Latin1.parse(password);
        var s = CryptoJS.enc.Latin1.parse(salt);
        return CryptoJS.PBKDF2(pw, s, {keySize: keySize, iterations: iterations}).toString(CryptoJS.enc.Latin1);
    }
    
    HmacSHA1(key: string, data: Uint8Array): Uint8Array {
        var k = CryptoJS.enc.Latin1.parse(key).toString(CryptoJS.enc.Hex);
        var d = CryptoJS.enc.Latin1.parse(helpers.arrayToString(data)).toString(CryptoJS.enc.Hex)
        var shaObj = new jsSHA(d, "HEX");
        var enc = shaObj.getHMAC(k, "HEX", "SHA-1", "B64");
        return helpers.stringToArray(CryptoJS.enc.Base64.parse(enc).toString(CryptoJS.enc.Latin1));
    }
}

export class NodeContacts implements IContacts {
    getContacts(): Array<String> {
        return null;
    }
}

export class NodeSocket implements ISocket {
    private socket: net.NodeSocket;
    
    connect(handler: ISocketHandler, host: string, port: number): void {
        this.socket = net.connect(port, host);
        this.socket.on("connect", () => handler.onconnect());
        this.socket.on("data", (data: NodeBuffer) => handler.ondata(NodeSocket.bufferToArray(data)));
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
        return CryptoJS.enc.Base64.parse(credentials.password).toString(CryptoJS.enc.Latin1);
    }
}

