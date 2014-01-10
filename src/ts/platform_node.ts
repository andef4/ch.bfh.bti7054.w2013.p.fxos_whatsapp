
export class NodePlatform implements IPlatform {
    getCrypto() {
        return new NodeCrypto();
    }
    getContacts() {
        return new NodeContacts();
    }
    getSocket() {
        return new NodeSocket();
    }
    getCredentials() {
        return new NodeCredentials();
    }
}


export class NodeCrypto implements ICrypto {
    
}

export class NodeContacts implements IContacts {
    
}

export class NodeSocket implements ISocket {
    
}

export class NodeCredentials implements ICredentials {
    
}

