import helpers = require("./helpers");

export function keyFromPasswordNonce(crypto: ICrypto, password: string, nonce: string): string {
    return crypto.PBKDF2(password, nonce, 5, 16);
}

function addStringToArray(arr: Array<number>, str: string): void {
    for(var i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
}

export function authBlob(username: string, nonce: string): Uint8Array {
    var nums: number[] = [];
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
    private crypto: ICrypto;
    private rc4: RC4Drop;
    private key: string;
    constructor(crypto: ICrypto, key: string) {
        this.crypto = crypto;
        this.key = key;
        this.rc4 = new RC4Drop(key, 256);
    }
    
    decrypt(data: Uint8Array): Uint8Array {
        // TODO check HMAC
        return this.rc4.cipher(data.subarray(4));
    }
    
    encrypt(data: Uint8Array, dataOffset: number, macOffset: number): Uint8Array {
        var encryptedData = this.rc4.cipher(data);
        var hmac = this.crypto.HmacSHA1(this.key, encryptedData);
        
        var ret = new Uint8Array(data.length + 4);
        for (var i = macOffset; i < macOffset + 4; i++) {
            ret[i] = hmac[i - macOffset];
        }
        for (var i = dataOffset; i < encryptedData.length + dataOffset; i++) {
            ret[i] = encryptedData[i - dataOffset];
        }
        return ret;
    }
}


export class RC4Drop {
    
    private i = 0;
    private j = 0;
    private s = new  Array<number>();
    
    constructor(key: string, drop: number) {
        for (var i = 0; i < 256; i++) {
            this.s.push(i);
        }
        for (var i = 0; i < 256; i++) {
            this.j = (this.j + this.s[i] + key.charAt(i % key.length).charCodeAt(0)) % 256;
            this.swap(i, this.j);
        }
        this.j = 0;
        
        var dropData = new  Uint8Array(drop);
        for (var i = 0; i < drop; i++) {
            dropData[i] = 0;
        }
        this.cipher(dropData);
    }
    
    swap(i: number, j: number): void {
        var tmp = this.s[i];
        this.s[i] = this.s[j];
        this.s[j] = tmp;
    }
    
    cipher(data: Uint8Array): Uint8Array {
        var length = data.length;
        var offset = 0;
        while (true) {
            var num = length;
            length = num - 1;
            if (num == 0) {
                break;
            }
            this.i = (this.i + 1) % 256;
            this.j = (this.j + this.s[this.i]) % 256;
            
            this.swap(this.i, this.j);
            
            var num2 = offset;
            offset = num2 + 1;
            
            data[num2] = data[num2];
            data[num2] = (data[num2] ^ this.s[(this.s[this.i] + this.s[this.j]) % 256]);
        }
        return data;
    }
    
}

/*

class RC4:
        def __init__(self, key, drop):
                self.s = []
                self.i = 0;
                self.j = 0;
                
                self.s = [0] * 256
                
                for i in range(0, len(self.s)):
                        self.s[i] = i
                
                for i in range(0, len(self.s)):
                        self.j = (self.j + self.s[i] + ord(key[i % len(key)])) % 256
                        RC4.swap(self.s, i, self.j)
                
                self.j = 0;
                
                self.cipher(_bytearray(drop), 0, drop)
        
        
        def cipher(self, data, offset, length):
                while True:
                        num = length
                        length = num - 1
                        
                        if num == 0: break
                        
                        self.i = (self.i+1) % 256
                        self.j = (self.j + self.s[self.i]) % 256
                        
                        RC4.swap(self.s, self.i, self.j)
                        
                        num2 = offset
                        offset = num2 + 1
                        
                        data[num2] = ord(data[num2]) if type(data[num2]) == str else data[num2]
                        data[num2] = (data[num2] ^ self.s[(self.s[self.i] + self.s[self.j]) % 256])
        
        @staticmethod
        def swap(arr, i, j):
                tmp = arr[i]
                arr[i] = arr[j]
                arr[j] = tmp
*/


