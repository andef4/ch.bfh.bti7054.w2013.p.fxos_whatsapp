import network = require("./network");
import constants = require("./constants");
import helpers = require("./helpers");



var to = '41796649940@s.whatsapp.net';
var msgId = '1389872325-1';
var message = 'test';




var packet = new network.Packet();

var server = new network.Node("server");
var x = new network.Node("x", {"xmlns":"jabber:x:event"}, [server]);
var body = new network.Node("body", {}, [], helpers.stringToArray(message));
var xml = new network.Node("message", {"to": to, "type": "chat", "id": msgId}, [body, x]);

packet.writeBinaryXml(xml);
var data = packet.serialize();

for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
}


var node_packet = [248, 8, 111, 200, 250, 252, 11, 52, 49, 55, 57, 54, 54, 52, 57, 57, 52, 48, 171, 203, 28, 77, 252, 12, 49, 51, 56, 57, 56, 55, 50, 51, 50, 53, 45, 49, 248, 2, 248, 4, 230, 232, 92, 248, 1, 248, 1, 174, 248, 2, 23, 252, 4, 116, 101, 115, 116]

//console.log(node_packet);





/*
/// <reference path="../lib/cryptojs.d.ts" />
/// <reference path="../lib/jssha.d.ts" />
import CryptoJS = require("crypto-js");
import security = require("./security");
import helpers = require("./helpers");
import platform = require("./platform_node");

import jsSHA = require("jssha");
*/

/*
Test: HMAC

var k = CryptoJS.enc.Base64.parse('myNv1TpnMmjFnuGrLS30TouOzVA=').toString(CryptoJS.enc.Latin1); // 20
var buf = CryptoJS.enc.Base64.parse('M2iKiFQQfYkkBEy8wW/1PCWBk852d5+Llog8THygYsm5t2lBb0JE/i8=').toString(CryptoJS.enc.Latin1);
var encrypted = CryptoJS.enc.Base64.parse('tL/YbDNoiohUEH2JJARMvMFv9TwlgZPOdnefi5aIPEx8oGLJubdpQW9CRP4v').toString(CryptoJS.enc.Latin1); // 45



//var shaObj = new jsSHA(CryptoJS.enc.Latin1.parse(buf).toString(CryptoJS.enc.Hex), "HEX");
//var enc = shaObj.getHMAC(CryptoJS.enc.Latin1.parse(k).toString(CryptoJS.enc.Hex), "HEX", "SHA-1", "HEX");


var enc = new platform.NodeCrypto().HmacSHA1(k, helpers.stringToArray(buf));

console.log(encrypted);
//console.log(enc);
console.log(helpers.arrayToString(enc));
*/


/*
Test: RC4

var k = CryptoJS.enc.Base64.parse('myNv1TpnMmjFnuGrLS30TouOzVA=').toString(CryptoJS.enc.Latin1); // 20
var authBlob = CryptoJS.enc.Base64.parse('NDE3NzQ0MjMxOTAvu692M3jmUdIncjRZO4DBBl20IDEzODk1NzIzMTQ=').toString(CryptoJS.enc.Latin1); // 45
var encrypted = CryptoJS.enc.Base64.parse('tL/YbDNoiohUEH2JJARMvMFv9TwlgZPOdnefi5aIPEx8oGLJubdpQW9CRP4v').toString(CryptoJS.enc.Latin1); // 45

var keystream = new security.KeyStream(new platform.NodeCrypto(), k);
var ab = helpers.stringToArray(authBlob);
var enc = helpers.arrayToString(keystream.encrypt(ab, 4, 0));

console.log("python:" + encrypted);
console.log("js    :" + enc);

console.log(enc == encrypted);
*/

/*
Test: keyFromPasswordNonce


var password = CryptoJS.enc.Base64.parse('3PPkLlE3Ns/gUAIpLpkt2P7+R7E=').toString(CryptoJS.enc.Latin1);
var nonce = CryptoJS.enc.Base64.parse('kG6UClEJrJAnxKjk890RvAqZTlI').toString(CryptoJS.enc.Latin1);


var k = CryptoJS.enc.Latin1.parse(security.keyFromPasswordNonce(new platform.NodeCrypto(), password, nonce));

var orgK = 'XpFRhDTWUl3kefNV4Ds4VzPXSdk=';

console.log(k.toString(CryptoJS.enc.Base64));
console.log(orgK);
*/

/*
pw: 3PPkLlE3Ns/gUAIpLpkt2P7+R7E=
nonce: kG6UClEJrJAnxKjk890RvAqZTlI
k: XpFRhDTWUl3kefNV4Ds4VzPXSdk=
*/