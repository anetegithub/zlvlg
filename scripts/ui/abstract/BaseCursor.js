define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BaseCursor = /** @class */ (function () {
        function BaseCursor() {
        }
        BaseCursor.prototype.set = function (game) {
            if (game.device.android || game.device.iOS || game.device.windowsPhone) {
                return;
            }
            else {
                document.getElementById('content').style.cursor = "url(" + this.url + "), auto";
            }
        };
        return BaseCursor;
    }());
    exports.BaseCursor = BaseCursor;
});
