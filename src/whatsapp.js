var WA;
(function (WA) {
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

            alert(WA.Constants.DICTIONARY.indexOf("resource").toString(16));

            this.writeString("to");
            this.writeString(WA.Constants.DOMAIN);
            this.writeString("resource");
            this.writeString(WA.Constants.TOKEN_DATA["r"]);
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
                this.writeInt8(WA.Constants.LIST_EMPTY);
            } else if (listLength < 256) {
                this.writeInt8(WA.Constants.LIST_8);
                this.writeInt8(listLength);
            } else {
                this.writeInt8(WA.Constants.LIST_16);
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
            var index = WA.Constants.DICTIONARY.indexOf(value);
            if (index < 0) {
                if (value.indexOf('@') > 0) {
                    this.writeJID(value);
                } else {
                    for (var i = 0; i < value.length; i++) {
                        this.packet.push(value.charCodeAt(i));
                    }
                }
            } else if (index < 245) {
                this.writeInt8(index);
            } else {
                this.writeInt8(WA.Constants.TOKEN_8);
                this.writeInt8(index - 245);
            }
        };

        Stream.prototype.writeJID = function (jid) {
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
