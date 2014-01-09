/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");


export function keyFromPasswordNonce(password: string, nonce: string): string {
    return CryptoJS.PBKDF2(password, nonce, {keySize: 5, iterations: 16}).toString(CryptoJS.enc.Latin1);
} 

function addStringToArray(arr: Array<number>, str: string): void {
    for(var i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
}

export function authBlob(username: string, nonce: string): Uint8Array {
    var nums: number[] = [0, 0, 0, 0];
    addStringToArray(nums, username);
    addStringToArray(nums, nonce);
    
    var utcTimestamp = Math.floor(new Date().getTime() / 1000).toString();
    
    addStringToArray(nums, utcTimestamp);
    
    var array = new Uint8Array(nums.length);
    for (var i = 0; i < nums.length; i++) {
        array[i] = nums[i];
    }
    return array;
}

export class KeyStream {
    constructor(key: string) {
        
    }
    
    encrypt(data: Uint8Array): Uint8Array {
        return null;
    }
}
