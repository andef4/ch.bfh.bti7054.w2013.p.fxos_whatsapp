var WA;
(function (WA) {
    (function (Network) {
        var Node = (function () {
            function Node(name, attrs, childs) {
                if (typeof attrs === "undefined") { attrs = {}; }
                if (typeof childs === "undefined") { childs = []; }
                this.name = name;
                this.attrs = attrs;
                this.childs = childs;
            }
            return Node;
        })();
        Network.Node = Node;

        var Packet = (function () {
            function Packet() {
                this.packet = [];
            }
            Packet.prototype.serialize = function () {
                var len = this.packet.length;
                var array = new Uint8Array(len + 3);
                array[0] = (len & 0xFF0000) >> 16;
                array[1] = (len & 0xFF00) >> 8;
                array[2] = (len & 0xFF);
                for (var i = 0; i < this.packet.length; i++) {
                    array[i + 3] = this.packet[i];
                }
                return array;
            };

            Packet.prototype.writeBinaryXml = function (node) {
                var _this = this;
                var length = 1;
                length += Object.keys(node.attrs).length * 2;
                if (node.childs.length) {
                    length += 1;
                }
                this.listStart(length);
                this.writeString(node.name);
                this.writeAttributes(node.attrs);

                if (node.childs.length) {
                    this.listStart(node.childs.length);
                    node.childs.forEach(function (child) {
                        return _this.writeBinaryXml(child);
                    });
                }
            };

            Packet.prototype.listStart = function (listLength) {
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

            Packet.prototype.writeAttributes = function (attributes) {
                for (var key in attributes) {
                    this.writeString(key);
                    this.writeString(attributes[key]);
                }
            };

            Packet.prototype.writeInt8 = function (value) {
                if (value > 255 || value < 0) {
                    throw "Bad value for writeInt8";
                }
                this.packet.push(value);
            };

            Packet.prototype.writeInt16 = function (value) {
                if (value > 65535 || value < 0) {
                    throw "Bad value for writeInt16";
                }
                this.packet.push((value & 0xFF00) >> 8);
                this.packet.push(value & 0xFF);
            };

            Packet.prototype.writeInt24 = function (value) {
                if (value > 16777216 || value < 0) {
                    throw "Bad value for writeInt16";
                }
                this.packet.push((value & 0xFF0000) >> 16);
                this.packet.push((value & 0xFF00) >> 8);
                this.packet.push(value & 0xFF);
            };

            Packet.prototype.writeBytes = function (bytes) {
                if (bytes.length > 255) {
                    this.writeInt8(WA.Constants.BINARY_24);
                    this.writeInt24(bytes.length);
                } else {
                    this.writeInt8(WA.Constants.BINARY_8);
                    this.writeInt8(bytes.length);
                }
                for (var i = 0; i < bytes.length; i++) {
                    this.packet.push(bytes.charCodeAt(i));
                }
            };

            Packet.prototype.writeString = function (value) {
                var index = WA.Constants.DICTIONARY.indexOf(value);
                if (index < 0) {
                    if (value.indexOf('@') > 0) {
                        this.writeJID(value);
                    } else {
                        this.writeBytes(value);
                    }
                } else if (index < 245) {
                    this.writeInt8(index);
                } else {
                    this.writeInt8(WA.Constants.TOKEN_8);
                    this.writeInt8(index - 245);
                }
            };

            Packet.prototype.writeJID = function (jid) {
            };
            return Packet;
        })();
        Network.Packet = Packet;
    })(WA.Network || (WA.Network = {}));
    var Network = WA.Network;
})(WA || (WA = {}));
