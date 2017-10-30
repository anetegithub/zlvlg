define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteMap {
        static create(json) {
            var spMap = new SpriteMap();
            spMap.frames = json.frames;
            return spMap;
        }
        getSpriteSection(section) {
            return this.filterByIncludes(new SpriteTypes()[section]);
        }
        filterByIncludes(char) {
            return this.frames.filter(x => x.filename.includes(char));
        }
    }
    exports.SpriteMap = SpriteMap;
    class SpriteTypes {
        constructor() {
            this.walls = '#';
            this.floors = '_';
            this.enemy = '^';
            this.decore = '*';
            this.floorobjects = '&';
            this.matery = '=';
            this.items = '.';
            this.weapons = 'W';
            this.people = '@';
        }
    }
    exports.SpriteTypes = SpriteTypes;
});
