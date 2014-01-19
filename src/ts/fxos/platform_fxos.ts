/// <reference path="../../lib/cryptojs.d.ts" />
/// <reference path="../../lib/jssha.d.ts" />
import platform = require("../platform");
import credentials = require("../credentials");
import helpers = require("../helpers");

export class FirefoxOSPlatform implements platform.IPlatform {
    getCrypto() {
        return new FirefoxOSCrypto();
    }
    getSocket() {
        return new FirefoxOSSocket();
    }
    getCredentials() {
        return new FirefoxOSCredentials();
    }
}

export class FirefoxOSCrypto implements platform.ICrypto {
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

export class FirefoxOSSocket implements platform.ISocket {
    private socket;
    onconnect: () => void;
    ondata: (data: Uint8Array) => void;
    
    connect(host: string, port: number): void {
        this.socket = navigator.mozTCPSocket.open(host, port, {binaryType: 'arraybuffer'});
        this.socket.onopen = () => this.onconnect();
        this.socket.ondata = (event) => this.ondata(new Uint8Array(event.data));
    }
    write(data: Uint8Array): void {
        this.socket.send(data.buffer);
    }
}

export class FirefoxOSCredentials implements platform.ICredentials {
    getUsername(): string {
        return credentials.username;
    }
    getPassword(): string {
        return CryptoJS.enc.Base64.parse(credentials.password).toString(CryptoJS.enc.Latin1);
    }
}

