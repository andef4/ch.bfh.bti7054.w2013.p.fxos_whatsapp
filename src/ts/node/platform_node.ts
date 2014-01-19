/// <reference path="../../lib/cryptojs.d.ts" />
/// <reference path="../../lib/jssha.d.ts" />
import platform = require("../platform");
import CryptoJS = require("crypto-js");
import net = require("net");
import jsSHA = require("jssha");
import credentials = require("../credentials");
import helpers = require("../helpers");

export class NodePlatform implements platform.IPlatform {
    getCrypto() {
        return new NodeCrypto();
    }
    getSocket() {
        return new NodeSocket();
    }
    getCredentials() {
        return new NodeCredentials();
    }
}

export class NodeCrypto implements platform.ICrypto {
    PBKDF2(password: string, salt: string, keySize: number, iterations: number): string {
        var pw = CryptoJS.enc.Latin1.parse(password);
        var s = CryptoJS.enc.Latin1.parse(salt);
        return CryptoJS.PBKDF2(pw, s, {keySize: keySize, iterations: iterations}).toString(CryptoJS.enc.Latin1);
    }
    
    HmacSHA1(key: string, data: Uint8Array): Uint8Array {
        var k = CryptoJS.enc.Latin1.parse(key).toString(CryptoJS.enc.Hex);
        var d = CryptoJS.enc.Latin1.parse(helpers.arrayToString(data)).toString(CryptoJS.enc.Hex);
        var shaObj = new jsSHA(d, "HEX");
        var enc = shaObj.getHMAC(k, "HEX", "SHA-1", "B64");
        return helpers.stringToArray(CryptoJS.enc.Base64.parse(enc).toString(CryptoJS.enc.Latin1));
    }
    
    decodeUTF8(data: Uint8Array): string {
        var str = helpers.arrayToString(data);
        return CryptoJS.enc.Latin1.parse(str).toString(CryptoJS.enc.Utf8);
    }
    
    encodeUTF8(str: string): Uint8Array {
        return helpers.stringToArray(CryptoJS.enc.Utf8.parse(str).toString(CryptoJS.enc.Latin1));
    }
}

export class NodeSocket implements platform.ISocket {
    private socket: net.NodeSocket;
    onconnect: () => void;
    ondata: (data: Uint8Array) => void;
    
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

export class NodeCredentials implements platform.ICredentials {
    getUsername(): string {
        return credentials.username;
    }
    getPassword(): string {
        return CryptoJS.enc.Base64.parse(credentials.password).toString(CryptoJS.enc.Latin1);
    }
}
