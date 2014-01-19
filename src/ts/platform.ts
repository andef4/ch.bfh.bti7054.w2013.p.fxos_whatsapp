export interface ICrypto {
    PBKDF2(password: string, salt: string, keySize: number, iterations: number): string;
    HmacSHA1(key: string, data: Uint8Array);
}

export interface ISocket {
    onconnect: () => void;
    ondata: (data: Uint8Array) => void;
    
    connect(host: string, port: number): void;
    write(data: Uint8Array): void;
}

export interface ICredentials {
    getPassword(): string;
    getUsername(): string;
}

export interface IPlatform {
    getCrypto(): ICrypto;
    getSocket(): ISocket;
    getCredentials(): ICredentials;
}
