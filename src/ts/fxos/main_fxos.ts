/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/handlebars.d.ts" />

import platform = require("./platform_fxos");
import connection = require("../connection");

enum Page {LOGIN, CONTACTS, CHAT};

class Client {
    // templates
    private contacts_template;
    private chat_template;
    private login_template;
    
    private current_page: Page;
    
    private connection: connection.WhatsAppConnection;
    
    constructor() {
        this.contacts_template = Handlebars.compile($('#contacts-template').html());
        this.chat_template = Handlebars.compile($('#chat-template').html());
        this.login_template = Handlebars.compile($('#login-template').html());
        
        this.connection = new connection.WhatsAppConnection(new platform.FirefoxOSPlatform());
        
        this.connection.onmessage = (from: string, message: string) => {
            $('#page').html(from + ': ' + message);
        }
    }
    
    connect() {
        this.connection.connect();
    }
    
    render_login() {
        $('#page').html(this.login_template());
        this.current_page = Page.LOGIN;
    }
    
    render_contacts() {
        var context = {
            contacts: [
                {name: 'fabio', tel: '+41796649940'},
                {name: 'fritz', tel: '+41796649940'}
            ]
        };
        $('#page').html(this.contacts_template(context));
        this.current_page = Page.CONTACTS;
    }
    
    render_chat(jid: string) {
        this.current_page = Page.CHAT;
    }
    
}

var client: Client;

$(document).ready(() => {
    client = new Client();
    client.render_login();
});

$('#login-button').on('click', () => {
    client.connect();
});
