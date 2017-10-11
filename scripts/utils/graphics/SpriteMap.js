define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteMap {
        static create(json) {
            var spMap = new SpriteMap();
            spMap.frames = json.frames;
            return spMap;
        }
        walls() {
            return this.frames.filter(x => x.filename.includes("|"));
        }
    }
    exports.SpriteMap = SpriteMap;
});
