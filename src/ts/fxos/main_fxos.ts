/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/handlebars.d.ts" />
import platform = require("./platform_fxos");
import connection = require("../connection");

enum Page {LOGIN, CONNECTING, CONTACTS, CHAT};

class Client {
    // templates
    private contacts_template;
    private chat_template;
    private login_template;
    private connecting_template;
    
    private current_page: Page;
    
    private connection: connection.WhatsAppConnection;
    
    private contacts = {};
    
    constructor() {
        this.contacts_template = Handlebars.compile($("#contacts-template").html());
        this.chat_template = Handlebars.compile($("#chat-template").html());
        this.login_template = Handlebars.compile($("#login-template").html());
        this.connecting_template = Handlebars.compile($("#connecting-template").html());
        
        this.connection = new connection.WhatsAppConnection(new platform.FirefoxOSPlatform());
        
        this.connection.onmessage = (from: string, message: string) => {
            var tel = from.replace("@s.whatsapp.net", "");
            this.contacts[tel].messages.push({text: message, direction: "in"});
            
            if (document.visibilityState == "hidden" || (this.current_page == Page.CHAT && $("#send-button").attr("data-tel") != tel)) {
                var notification = navigator.mozNotification.createNotification('WhatsApp', "Nachricht von " + this.contacts[tel].name);
                notification.onclick = function() {
                   navigator.mozApps.getSelf().onsuccess = (evt) => {
                        var app = evt.target.result;
                        app.launch();
                        showContacts();
                    };
                }
                notification.show();
            }
            
            if (this.current_page == Page.CONTACTS) {
                this.contacts[tel].unread_messages = true;
                this.render_contacts();
            } else if (this.current_page == Page.CHAT && $("#send-button").attr("data-tel") == tel) {
                $(".container").append($('<div class="message in">' + message + '</div>'));
            }
        }
        
        this.connection.onconnect = () => {
            this.fetch_contacts();
        }
    }
    
    connect() {
        this.connection.connect();
    }
    
    fetch_contacts() {
        var request = navigator.mozContacts.getAll({sortBy: "givenName", sortOrder: "descending"});
        request.onsuccess = (event) => {
            
            var cursor = event.target;
            if (cursor.result) {
                var name = cursor.result.givenName + " " + cursor.result.familyName;
                var tel = cursor.result.tel[0].value;
                this.contacts[tel] = {name: name, messages: [], unread_messages: false};
            } else {
                this.render_contacts();
            }
        }
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
    
    render_connecting() {
        $("#page").html(this.connecting_template());
        $(".navbar-brand").html("WhatsApp");
        this.current_page = Page.CONNECTING;
        init();
    }
    
    render_chat(tel: string) {
        this.contacts[tel].unread_messages = false;
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
        this.connection.sendMessage(tel + "@s.whatsapp.net", text);
        this.contacts[tel].messages.push({text: text, direction: "out"});
    }
}

var client: Client;

$(document).ready(() => {
    client = new Client();
    client.render_login();
    init();
});

function showContacts() {
    client.render_contacts();
}

function scrollToBottom() {
    $("html, body").animate({ scrollTop: $(document).height() }, 0);
}

function init() {
    $("#login-button").on('click', () => {
        client.render_connecting();
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
