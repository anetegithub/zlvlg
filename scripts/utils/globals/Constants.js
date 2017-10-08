define(["require", "exports", "./IoC"], function (require, exports, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Constants {
        static get centerX() {
            return IoC_1.Container.game.world.centerX;
        }
        static get centerY() {
            return IoC_1.Container.game.world.centerY - (300 / 2);
        }
    }
    Constants.color = '#1eb79b';
    Constants.fontFamily = 'Ringbear';
    exports.Constants = Constants;
});
