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
        static get mapHeight() {
            return Constants.playHeight - Constants.barHeight;
        }
    }
    Constants.color = '#1eb79b';
    Constants.fontFamily = 'Ringbear';
    Constants.windowWidth = 800;
    Constants.windowHeight = 784;
    Constants.playWidth = 796;
    Constants.playHeight = 600;
    Constants.mapWidth = 768;
    Constants.barHeight = 16;
    Constants.mapOffset = {
        get x() {
            return (Constants.windowWidth - Constants.mapWidth) / 2;
        },
        y: 104
    };
    Constants.gameWindowOffset = {
        x: 16,
        y: 2
    };
    exports.Constants = Constants;
});
