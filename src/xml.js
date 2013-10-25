var WA;
(function (WA) {
    (function (XML) {
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
        XML.Node = Node;
    })(WA.XML || (WA.XML = {}));
    var XML = WA.XML;
})(WA || (WA = {}));
