define(["require", "exports", "../abstract/BaseCursor"], function (require, exports, BaseCursor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ZombieHand extends BaseCursor_1.BaseCursor {
        constructor() {
            super(...arguments);
            this.url = './images/ui/cursors/cursor.png';
        }
    }
    exports.ZombieHand = ZombieHand;
});
