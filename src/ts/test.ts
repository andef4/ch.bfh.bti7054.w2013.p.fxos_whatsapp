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