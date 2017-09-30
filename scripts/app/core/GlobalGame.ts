import { } from "../../../node_modules/phaser-ce/typescript/phaser";
import { } from "../../app/core/interfaces/IManagedResource";
import { GlobalArgs } from "./GlobalArgs";
import { Container } from "../../utils/globals/IoC";
import { MainMenuScene } from "../../scene/scenes/MainMenuScene";

/**
 * Initialize container
 */
export class GlobalGame {
    constructor(args: GlobalArgs) {
        this.args = args;
        Container.sceneMgr = args.sceneMgr;
    }

    args: GlobalArgs;
    game: Phaser.Game;

    run() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game['args'] = this.args;
        Container.game = this.game;
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
                var arg: IManagedResource = args[key];
                arg.release(this.game);
            }
        }

        this.startTheGame();
    }

    private startTheGame() {
        Container.sceneMgr.add(new MainMenuScene());
        Container.sceneMgr.next("MainMenu");
    }
}