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
        "41796779358": {name: "Matthias Gasser", messages: [], unread_messages: false}
    }
    
    constructor() {
        this.contacts_template = Handlebars.compile($("#contacts-template").html());
        this.chat_template = Handlebars.compile($("#chat-template").html());
        this.login_template = Handlebars.compile($("#login-template").html());
        
        this.connection = new connection.WhatsAppConnection(new platform.FirefoxOSPlatform());
        
        this.connection.onmessage = (from: string, message: string) => {
            var tel = from.replace("@s.whatsapp.net", "");
            this.contacts[tel].messages.push({text: message, direction: "in"});
            
            if (document.visibilityState == "hidden" || (this.current_page == Page.CHAT && $("#send-button").attr("data-tel") != tel)) {
                var notification = navigator.mozNotification.createNotification('WhatsApp', "Nachricht von " + this.contacts[tel].name);
                notification.onclick = function() {
                   navigator.mozApps.getSelf().onsuccess = function(evt) {
                        var app = evt.target.result;
                        app.launch();
                    };
                }
                notification.show();
                this.render_contacts();
            }
            
            if (this.current_page == Page.CONTACTS) {
                this.contacts[tel]["unread_messages"] = true;
                this.render_contacts();
            } else if (this.current_page == Page.CHAT && $("#send-button").attr("data-tel") == tel) {
                $(".container").append($('<div class="message in">' + message + '</div>'));
            }
        }
        
        this.connection.onconnect = () => {
            this.render_contacts();
        }
    }
    
    connect() {
        this.connection.connect();
    }
    
    render_login() {
        $("#page").html(this.login_template());
        $(".navbar-brand").html("WhatsApp");
        this.current_page = Page.LOGIN;
        init();
    }
    
    render_contacts() {
        var context = {
            contacts: this.contacts
        };
        $("#page").html(this.contacts_template(context));
        $(".navbar-brand").html("WhatsApp - Kontake");
        this.current_page = Page.CONTACTS;
        init();
    }
    
    render_chat(tel: string) {
        this.contacts[tel]["unread_messages"] = false;
        var context = {
            messages: this.contacts[tel].messages,
            tel: tel
        }
        $("#page").html(this.chat_template(context));
        $(".navbar-brand").html("WhatsApp - " + this.contacts[tel].name);
        this.current_page = Page.CHAT;
        
        scrollToBottom();
        init();
    }
    
    sendMessage(tel: string, text: string) {
        console.log(tel);
        console.log(tel + "@s.whatsapp.net");
        this.connection.sendMessage(tel + "@s.whatsapp.net", text);
    }
}

var client: Client;

$(document).ready(() => {
    client = new Client();
    client.render_login();
    init();
});

function scrollToBottom() {
    $("html, body").animate({ scrollTop: $(document).height() }, 0);
}

function init() {
    $("#login-button").on('click', () => {
        client.connect();
    });
    
    $(".contact-button").on("click", function() {
        var tel = $(this).attr("data-tel");
        client.render_chat(tel);
    });
    
    $('.navbar-brand').on("click", () => {
        client.render_contacts();
    });
    
    $("#send-button").on("click", () => {
        var text = $("#text-input").val();
        var tel = $("#send-button").attr("data-tel");
        client.sendMessage(tel, text);
        $(".container").append($('<div class="message out">' + text + '</div>'));
        $("#text-input").val("");
        scrollToBottom();
    });
}
