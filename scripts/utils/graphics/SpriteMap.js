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
            return this.filterByIncludes('|');
        }
        floors() {
            return this.filterByIncludes('-');
        }
        decorations() {
            return this.filterByIncludes('@');
        }
        items() {
            return this.filterByIncludes('^')
                .concat(this.filterByIncludes('='));
        }
        filterByIncludes(char) {
            return this.frames.filter(x => x.filename.includes(char));
        }
    }
    exports.SpriteMap = SpriteMap;
});
