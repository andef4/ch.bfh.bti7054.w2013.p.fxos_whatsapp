/// <reference path="../lib/cryptojs.d.ts" />
import CryptoJS = require("crypto-js");
import security = require("./security");
import helpers = require("./helpers");
import platform = require("./platform_node");

var k = CryptoJS.enc.Base64.parse('myNv1TpnMmjFnuGrLS30TouOzVA=').toString(CryptoJS.enc.Latin1); // 20
var authBlob = CryptoJS.enc.Base64.parse('NDE3NzQ0MjMxOTAvu692M3jmUdIncjRZO4DBBl20IDEzODk1NzIzMTQ=').toString(CryptoJS.enc.Latin1); // 45
var encrypted = CryptoJS.enc.Base64.parse('tL/YbDNoiohUEH2JJARMvMFv9TwlgZPOdnefi5aIPEx8oGLJubdpQW9CRP4v').toString(CryptoJS.enc.Hex); // 45


/*var keystream = new security.KeyStream(new platform.NodeCrypto(), k);
var ab = helpers.stringToArray(authBlob);
var enc = helpers.arrayToString(keystream.encrypt(ab, 4, 0));
*/

//console.log(CryptoJS.enc.Latin1.parse(enc).toString(CryptoJS.enc.Hex));
var rc4 = CryptoJS.algo.RC4Drop.createEncryptor(CryptoJS.enc.Latin1.parse(k), {drop: 256*4});

var e = rc4.process(authBlob).toString(CryptoJS.enc.Hex);


console.log(encrypted);
console.log(e);

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