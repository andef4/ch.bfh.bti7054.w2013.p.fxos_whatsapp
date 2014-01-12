interface ICrypto {
    PBKDF2(password: string, salt: string, keySize: number, iterations: number): string;    
}
interface IContacts {
    getContacts(): Array<String>;
}

interface ISocket {
    connect(host: string, port: number): void;
    write(data: Uint8Array): void;
    ondata: {(data: Uint8Array): void};
    onconnect: {(): void};
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
