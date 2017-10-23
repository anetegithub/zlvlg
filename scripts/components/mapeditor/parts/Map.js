define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Map extends Phaser.Group {
        constructor() {
            super(...arguments);
            this.sprites = [];
        }
    }
    exports.Map = Map;
});
