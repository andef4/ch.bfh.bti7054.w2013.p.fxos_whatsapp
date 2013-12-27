/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");


export function keyFromPasswordNonce(password: string, nonce: string): string {
    return "";
} 

export function authBlob(username: string, nonce: string): string {
    return "";
}

export class KeyStream {
    constructor(key: string) {
        
    }
    
    encrypt(data: string): string {
        return "";
    }
}


console.log(CryptoJS.PBKDF2("password", "salt", {keySize: 20}));

