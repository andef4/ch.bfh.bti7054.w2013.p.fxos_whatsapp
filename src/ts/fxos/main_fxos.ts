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
    
    
    private contacts = {
        "41796649940": {name: "Fabio Anderegg", messages: [
            {text: "Hallo Welt", direction: "out"},
            {text: "1234", direction: "in"},
            {text: "Welcome back", direction: "out"},
            {text: "Test", direction: "out"},
        ], unread_messages: false},
        "41796779358": {name: "Matthias Gasser", messages: [], unread_messages: true}
    }
    
    constructor() {
        this.contacts_template = Handlebars.compile($("#contacts-template").html());
        this.chat_template = Handlebars.compile($("#chat-template").html());
        this.login_template = Handlebars.compile($("#login-template").html());
        
        this.connection = new connection.WhatsAppConnection(new platform.FirefoxOSPlatform());
        
        this.connection.onmessage = (from: string, message: string) => {
            //$('#page').html(from + ': ' + message);
        }
        this.connection.onconnect = () => {
            this.render_contacts();
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
            contacts: this.contacts
        };
        $("#page").html(this.contacts_template(context));
        this.current_page = Page.CONTACTS;
    }
    
    render_chat(tel: string) {
        $("#page").html(this.chat_template(this.contacts[tel]));
        this.current_page = Page.CHAT;
    }
    
}

var client: Client;

$(document).ready(() => {
    client = new Client();
    //client.render_login();
    //client.render_contacts();
    client.render_chat("41796649940");
});

$('#login-button').on('click', () => {
    client.connect();
});

$(".contact").on("click", function() {
    var tel = $(this).attr("data-tel");
    client.render_chat(tel);
});

$('.navbar-brand').on("click", () => {
    client.render_contacts();
});


