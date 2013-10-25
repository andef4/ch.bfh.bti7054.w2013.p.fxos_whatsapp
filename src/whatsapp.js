var WA;
(function (WA) {
    var WhatsApp = (function () {
        function WhatsApp() {
            this.port = 443;
            this.host = 'c2.whatsapp.net';
        }
        return WhatsApp;
    })();

    var Stream = (function () {
        function Stream() {
            this.packet = [];
        }
        Stream.prototype.start = function () {
            this.writeString("WA");
            this.writeInt8(1);
            this.writeInt8(2);

            this.writeInt8(0);
            this.writeInt8(0);
            this.writeInt8(18);

            this.listStart(5);
            this.writeInt8(1);

            this.writeString("to");
            this.writeString(WA.Constants.domain);
            this.writeString("resource");
            this.writeString(WA.Constants.tokenData["r"]);
        };

        Stream.prototype.getPacket = function () {
            var array = new Uint8Array(this.packet.length);
            for (var i = 0; i < this.packet.length; i++) {
                array[i] = this.packet[i];
            }
            return array;
        };

        Stream.prototype.listStart = function (listLength) {
            if (listLength == 0) {
                this.writeInt8(0);
            } else if (listLength < 256) {
                this.writeInt8(248);
                this.writeInt8(listLength);
            } else {
                this.writeInt8(249);
                this.writeInt16(listLength);
            }
        };

        Stream.prototype.writeAttributes = function (attributes) {
            for (var key in attributes) {
                this.writeString(key);
                this.writeString(attributes[key]);
            }
        };

        Stream.prototype.writeInt8 = function (value) {
            if (value > 255 || value < 0) {
                throw "Bad value for writeInt8";
            }
            this.packet.push(value);
        };

        Stream.prototype.writeInt16 = function (value) {
            if (value > 65535 || value < 0) {
                throw "Bad value for writeInt16";
            }
        };

        Stream.prototype.writeString = function (value) {
            for (var i = 0; i < value.length; i++) {
                this.packet.push(value.charCodeAt(i));
            }
        };
        return Stream;
    })();
    WA.Stream = Stream;
})(WA || (WA = {}));

var stream = new WA.Stream();
stream.start();
var packet = stream.getPacket();
var str = "";
for (var i = 0; i < packet.length; i++) {
    var c = packet[i].toString(16);
    if (c.length == 1) {
        str += "0";
    }
    str += c;
    str += " ";
}

document.getElementById("content").innerHTML = str;
