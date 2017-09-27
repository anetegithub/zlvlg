define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BaseCursor = /** @class */ (function () {
        function BaseCursor() {
        }
        BaseCursor.prototype.set = function (game) {
            if (game.device.desktop) {
                game.canvas.style.cursor = "url(\"" + this.url + "\") pointer";
            }
        };
        return BaseCursor;
    }());
    exports.BaseCursor = BaseCursor;
});
