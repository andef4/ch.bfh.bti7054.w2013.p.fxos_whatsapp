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
    constructor(key: string) {
        
    }
    
    encrypt(data: Uint8Array, dataOffset: number, dataLength: number, macOffset: number): Uint8Array {
        return null;
    }
}
