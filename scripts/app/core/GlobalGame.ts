
import { } from "../../../node_modules/phaser-ce/typescript/phaser";
import { } from "../../ui/interfaces/IGlobalGameArg";
import { GlobalArgs } from "./GlobalArgs";

export class GlobalGame {
    constructor(args: GlobalArgs) {
        this.args = args;
    }

    args: GlobalArgs;
    game: Phaser.Game;

    run() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game['args'] = this.args;
    }

    preload() {
        this.game.load.image('logo', 'images/environment/BG0.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        let args = this.game['args'] as GlobalArgs;
        for (var key in args) {
            if (args.hasOwnProperty(key)) {
                var arg: IGlobalGameArg = args[key];
                arg.release(this.game);
            }
        }
    }
}