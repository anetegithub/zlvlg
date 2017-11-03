define(["require", "exports", "../../utils/globals/ArrayExtensions", "../enums/Sex"], function (require, exports, ArrayExtensions_1, Sex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Doll extends Phaser.Sprite {
        constructor(game, x, y, key, frame, sex) {
            super(game, x, y, key, frame);
            this.scale.x = 2;
            this.scale.y = 2;
            this.sex = sex || Sex_1.Sex.Male;
            this.fillanimationStore();
        }
        fillanimationStore() {
            let start = this.sex * 50;
            this.animations.add('idle', ArrayExtensions_1.range(start + 1, start + 10), 1, true);
            this.animations.add('gesture', ArrayExtensions_1.range(start + 11, start + 20), 1, true);
            this.animations.add('walk', ArrayExtensions_1.range(start + 21, start + 30), 1, true);
            this.animations.add('attack', ArrayExtensions_1.range(start + 31, start + 40), 1, true);
            this.animations.add('death', ArrayExtensions_1.range(start + 41, start + 50), 1, true);
            this.animations.add('full', ArrayExtensions_1.range(start + 1, start + 50), 1, true);
            this.animations.add('exceptDeath', ArrayExtensions_1.range(start + 1, start + 40), 1, true);
        }
        setAnim(key, loop) {
            this.animations.play(key, 9, loop);
        }
    }
    exports.Doll = Doll;
});
