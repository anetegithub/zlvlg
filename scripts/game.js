define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var b = /** @class */ (function () {
        function b() {
        }
        b.prototype.run = function () {
            return 'hw';
        };
        return b;
    }());
    exports.b = b;
});
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var a = /** @class */ (function () {
        function a(b) {
            debugger;
            console.log(b.run());
        }
        return a;
    }());
    exports.a = a;
});
define("start", ["require", "exports", "b", "a"], function (require, exports, b_1, a_1) {
    "use strict";
    exports.__esModule = true;
    new a_1.a(new b_1.b());
    console.log('wtf');
});
