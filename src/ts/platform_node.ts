/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");
import net = require("net");
import credentials = require("./credentials");
import helpers = require("./helpers");

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

export class NodeRC4 implements IRC4 {
    private rc4;
    
    init(key: string, dropBytes: number): void {
        this.rc4 = CryptoJS.algo.RC4Drop.createEncryptor(CryptoJS.enc.Latin1.parse(key), {drop: dropBytes*4});
    }
    
    encrypt(data: Uint8Array): Uint8Array {
        var encrypted = this.rc4.process(helpers.arrayToString(data));
        return helpers.stringToArray(encrypted.toString(CryptoJS.enc.Latin1));
    }
}

export class NodeCrypto implements ICrypto {
    PBKDF2(password: string, salt: string, keySize: number, iterations: number): string {
        return CryptoJS.PBKDF2(password, salt, {keySize: keySize, iterations: iterations}).toString(CryptoJS.enc.Latin1);
    }
    
    RC4(key: string, drop: number): IRC4 {
        var rc4 = new NodeRC4();
        rc4.init(key, drop)
        return rc4;
    }
    
    HmacSHA1(key: string, data: Uint8Array): Uint8Array {
        var encrypted = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(key), CryptoJS.enc.Latin1.parse(helpers.arrayToString(data)));
        return helpers.stringToArray(encrypted.toString(CryptoJS.enc.Latin1));
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
        return credentials.password;
    }
}

