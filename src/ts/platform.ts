interface ICrypto {}
interface IContacts {}
interface ISocket {}
interface ICredentials {}


interface IPlatform {
    getCrypto(): ICrypto;
    getContacts(): IContacts;
    getSocket(): ISocket;
    getCredentials(): ICredentials;
}
