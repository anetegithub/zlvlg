import { range } from "../../utils/globals/ArrayExtensions";
import { Sex } from "../enums/Sex";

export class Doll extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, sex?: Sex) {
        super(game, x, y, key, frame);
        this.scale.x = 2;
        this.scale.y = 2;
        this.sex = sex || Sex.Male;
        this.fillanimationStore();
        this.inputEnabled = true;
    }

    private sex: Sex;
    private fillanimationStore() {
        let start = this.sex * 50;
        this.animations.add('idle', range(start + 1, start + 10), 1, true);
        this.animations.add('gesture', range(start + 11, start + 20), 1, true);
        this.animations.add('walk', range(start + 21, start + 30), 1, true);
        this.animations.add('attack', range(start + 31, start + 40), 1, true);
        this.animations.add('death', range(start + 41, start + 50), 1, true);
        this.animations.add('full', range(start + 1, start + 50), 1, true);
        this.animations.add('exceptDeath', range(start + 1, start + 40), 1, true);
    }

    setAnim(key: keyof { idle, gesture, walk, attack, death, full, exceptDeath }, loop: boolean) {
        this.animations.play(key, 9, loop);
    }
}