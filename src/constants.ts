/*

	dictionary = [undefined, undefined, undefined, undefined, undefined, "account", "ack", "action", "active", "add", "after", "ib", "all", "allow", "apple", "audio", "auth", "author", "available", "bad-protocol", "bad-request", "before", "Bell.caf", "body", "Boing.caf", "cancel", "category", "challenge", "chat", "clean", "code", "composing", "config", "conflict", "contacts", "count", "create", "creation", "default", "delay", "delete", "delivered", "deny", "digest", "DIGEST-MD5-1", "DIGEST-MD5-2", "dirty", "elapsed", "broadcast", "enable", "encoding", "duplicate", "error", "event", "expiration", "expired", "fail", "failure", "false", "favorites", "feature", "features", "field", "first", "free", "from", "g.us", "get", "Glass.caf", "google", "group", "groups", "g_notify", "g_sound", "Harp.caf", "http://etherx.jabber.org/streams", "http://jabber.org/protocol/chatstates", "id", "image", "img", "inactive", "index", "internal-server-error", "invalid-mechanism", "ip", "iq", "item", "item-not-found", "user-not-found", "jabber:iq:last", "jabber:iq:privacy", "jabber:x:delay", "jabber:x:event", "jid", "jid-malformed", "kind", "last", "latitude", "lc", "leave", "leave-all", "lg", "list", "location", "longitude", "max", "max_groups", "max_participants", "max_subject", "mechanism", "media", "message", "message_acks", "method", "microsoft", "missing", "modify", "mute", "name", "nokia", "undefined", "not-acceptable", "not-allowed", "not-authorized", "notification", "notify", "off", "offline", "order", "owner", "owning", "paid", "participant", "participants", "participating", "password", "paused", "picture", "pin", "ping", "platform", "pop_mean_time", "pop_plus_minus", "port", "presence", "preview", "probe", "proceed", "prop", "props", "p_o", "p_t", "query", "raw", "reason", "receipt", "receipt_acks", "received", "registration", "relay", "remote-server-timeout", "remove", "Replaced by new connection", "request", "required", "resource", "resource-constraint", "response", "result", "retry", "rim", "s.whatsapp.net", "s.us", "seconds", "server", "server-error", "service-unavailable", "set", "show", "sid", "silent", "sound", "stamp", "unsubscribe", "stat", "status", "stream:error", "stream:features", "subject", "subscribe", "success", "sync", "system-shutdown", "s_o", "s_t", "t", "text", "timeout", "TimePassing.caf", "timestamp", "to", "Tri-tone.caf", "true", "type", "unavailable", "uri", "url", "urn:ietf:params:xml:ns:xmpp-sasl", "urn:ietf:params:xml:ns:xmpp-stanzas", "urn:ietf:params:xml:ns:xmpp-streams", "urn:xmpp:delay", "urn:xmpp:ping", "urn:xmpp:receipts", "urn:xmpp:whatsapp", "urn:xmpp:whatsapp:account", "urn:xmpp:whatsapp:dirty", "urn:xmpp:whatsapp:mms", "urn:xmpp:whatsapp:push", "user", "username", "value", "vcard", "version", "video", "w", "w:g", "w:p", "w:p:r", "w:profile:picture", "wait", "x", "xml-not-well-formed", "xmlns", "xmlns:stream", "Xylophone.caf", "1", "WAUTH-1"]

	host = "c2.whatsapp.net"
	port = 443
	domain = "s.whatsapp.net"

	v="0.8"



	tokenStorage = "~/.yowsup/t_%s"%(v.replace(".", "_"))
	tokenSource = ("openwhatsapp.org", "/t")

*/

module WA.Constants {
    export var TOKEN_DATA = {
    		"v": "2.11.1",
    		"r": "S40-2.11.1",
    		"u": "WhatsApp/2.11.1 S40Version/14.26 Device/Nokia302",
    		"t": "PdA2DJyKoUrwLw1Bg6EIhzh502dF9noR9uFCllGk1377032097395{phone}",
    		"d": "Nokia302x"
    }
    export var HOST = "c2.whatsapp.net"
    export var PORT = 443
    export var DOMAIN = "s.whatsapp.net"
    export var DICTIONARY = [undefined, undefined, undefined, undefined, undefined, "account", "ack", "action", "active", "add", "after", "ib", "all", "allow", "apple", "audio", "auth", "author", "available", "bad-protocol", "bad-request", "before", "Bell.caf", "body", "Boing.caf", "cancel", "category", "challenge", "chat", "clean", "code", "composing", "config", "conflict", "contacts", "count", "create", "creation", "default", "delay", "delete", "delivered", "deny", "digest", "DIGEST-MD5-1", "DIGEST-MD5-2", "dirty", "elapsed", "broadcast", "enable", "encoding", "duplicate", "error", "event", "expiration", "expired", "fail", "failure", "false", "favorites", "feature", "features", "field", "first", "free", "from", "g.us", "get", "Glass.caf", "google", "group", "groups", "g_notify", "g_sound", "Harp.caf", "http://etherx.jabber.org/streams", "http://jabber.org/protocol/chatstates", "id", "image", "img", "inactive", "index", "internal-server-error", "invalid-mechanism", "ip", "iq", "item", "item-not-found", "user-not-found", "jabber:iq:last", "jabber:iq:privacy", "jabber:x:delay", "jabber:x:event", "jid", "jid-malformed", "kind", "last", "latitude", "lc", "leave", "leave-all", "lg", "list", "location", "longitude", "max", "max_groups", "max_participants", "max_subject", "mechanism", "media", "message", "message_acks", "method", "microsoft", "missing", "modify", "mute", "name", "nokia", "undefined", "not-acceptable", "not-allowed", "not-authorized", "notification", "notify", "off", "offline", "order", "owner", "owning", "paid", "participant", "participants", "participating", "password", "paused", "picture", "pin", "ping", "platform", "pop_mean_time", "pop_plus_minus", "port", "presence", "preview", "probe", "proceed", "prop", "props", "p_o", "p_t", "query", "raw", "reason", "receipt", "receipt_acks", "received", "registration", "relay", "remote-server-timeout", "remove", "Replaced by new connection", "request", "required", "resource", "resource-constraint", "response", "result", "retry", "rim", "s.whatsapp.net", "s.us", "seconds", "server", "server-error", "service-unavailable", "set", "show", "sid", "silent", "sound", "stamp", "unsubscribe", "stat", "status", "stream:error", "stream:features", "subject", "subscribe", "success", "sync", "system-shutdown", "s_o", "s_t", "t", "text", "timeout", "TimePassing.caf", "timestamp", "to", "Tri-tone.caf", "true", "type", "unavailable", "uri", "url", "urn:ietf:params:xml:ns:xmpp-sasl", "urn:ietf:params:xml:ns:xmpp-stanzas", "urn:ietf:params:xml:ns:xmpp-streams", "urn:xmpp:delay", "urn:xmpp:ping", "urn:xmpp:receipts", "urn:xmpp:whatsapp", "urn:xmpp:whatsapp:account", "urn:xmpp:whatsapp:dirty", "urn:xmpp:whatsapp:mms", "urn:xmpp:whatsapp:push", "user", "username", "value", "vcard", "version", "video", "w", "w:g", "w:p", "w:p:r", "w:profile:picture", "wait", "x", "xml-not-well-formed", "xmlns", "xmlns:stream", "Xylophone.caf", "1", "WAUTH-1"];
    
    export var STREAM_START = 1;
    export var STREAM_END = 2;
    export var LIST_EMPTY = 0;
    export var LIST_8 = 248;
    export var LIST_16 = 249;
    export var JID_PAIR = 250;
    export var BINARY_8 = 252;
    export var BINARY_24 = 253;
    export var TOKEN_8 = 254;
}

