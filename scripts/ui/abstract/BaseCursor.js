define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseCursor {
        release(game) {
            if (game.device.android || game.device.iOS || game.device.windowsPhone) {
                return;
            }
            else {
                document.getElementById('content').style.cursor = `url(${this.url}), auto`;
            }
        }
    }
    exports.BaseCursor = BaseCursor;
});
