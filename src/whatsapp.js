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
        }
        Stream.prototype.start = function () {
            var packet = 'WA\01\02';
            var streamOpenAttributes = { to: WA.Constants.domain, resource: WA.Constants.tokenData["r"] };
            packet = 'WA\01\02' + this.listStart(5) + this.writeInt8(1) + this.writeAttributes(streamOpenAttributes);
            return packet;
        };

        Stream.prototype.listStart = function (listLength) {
            if (listLength == 0) {
                return this.writeInt8(0);
            } else if (listLength < 256) {
                return this.writeInt8(248) + this.writeInt8(listLength);
            } else {
                return this.writeInt8(249) + this.writeInt16(listLength);
            }
            return "";
        };

        Stream.prototype.writeAttributes = function (attributes) {
            return "";
        };

        Stream.prototype.writeInt8 = function (value) {
            return "";
        };

        Stream.prototype.writeInt16 = function (value) {
            return "";
        };

        Stream.prototype.writeString = function (value) {
            return "";
        };
        return Stream;
    })();
    WA.Stream = Stream;
})(WA || (WA = {}));

function encode(packet) {
    console.log(packet);
}

var packet = '<stream:features>' + '<receipt_acks>' + '</receipt_acks>' + '<w:profile:picture type="all">' + '</w:profile:picture>' + '<w:profile:picture type="group">' + '</w:profile:picture>' + '<notification type="participant">' + '</notification>' + '<status>' + '</status>' + '</stream:features>';

encode(packet);

var stream = new WA.Stream();
