export function keyFromPasswordNonce(crypto: ICrypto, password: string, nonce: string): string {
    return crypto.PBKDF2(password, nonce, 5, 16);
}

function addStringToArray(arr: Array<number>, str: string): void {
    for(var i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
}

export function authBlob(username: string, nonce: string): Uint8Array {
    var nums: number[] = [0, 0, 0, 0]; // space to write HMAC
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
    private rc4: IRC4;
    private key: string;
    constructor(crypto: ICrypto, key: string) {
        this.crypto = crypto;
        this.key = key;
        this.rc4 = this.crypto.RC4(key, 256);
    }
    
    decrypt(data: Uint8Array): Uint8Array {
        return null;
    }
    
    encrypt(data: Uint8Array, dataOffset: number, macOffset: number): Uint8Array {
        var encryptedData = this.rc4.encrypt(data);
        var hmac = this.crypto.HmacSHA1(this.key, encryptedData);
        
        var ret = new Uint8Array(data.length + 4);
        for (var i = macOffset; i < macOffset + 4; i++) {
            ret[i] = hmac[i - macOffset];
        }
        for (var i = dataOffset; i < encryptedData.length; i++) {
            ret[i] = encryptedData[i - dataOffset];
        }
        return ret;
    }
}
