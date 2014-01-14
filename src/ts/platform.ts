interface ICrypto {
    PBKDF2(password: string, salt: string, keySize: number, iterations: number): string;
    HmacSHA1(key: string, data: Uint8Array);
}
interface IContacts {
    getContacts(): Array<String>;
}

interface ISocket {
    onconnect: () => void;
    ondata: (data: Uint8Array) => void;
    
    connect(host: string, port: number): void;
    write(data: Uint8Array): void;
}

interface ICredentials {
    getPassword(): string;
    getUsername(): string;
}

interface IPlatform {
    getCrypto(): ICrypto;
    getContacts(): IContacts;
    getSocket(): ISocket;
    getCredentials(): ICredentials;
}
