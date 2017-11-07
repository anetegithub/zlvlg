import { } from "../../../node_modules/phaser-ce/typescript/phaser";
import { } from "../../../node_modules/@orange-games/phaser-input/build/phaser-input";
import { GlobalArgs } from "./GlobalArgs";
import { Container } from "../../utils/globals/IoC";
import { Constants } from "../../utils/globals/Constants";
import { GameStorage } from "../../data/GameStorage";

/**
 * Initialize container
 */
export class GlobalGame {
    constructor(args: GlobalArgs) {
        this.args = args;
    }

    args: GlobalArgs;
    game: Phaser.Game;

    run() {
        this.game = new Phaser.Game(Constants.windowWidth, Constants.windowHeight, Phaser.CANVAS, 'content', {
            preload: this.preload,
            create: this.create,
            render: this.render
        }, true, false);

        this.game['args'] = this.args;
        this.game['inited'] = this.inited;
        Container.game = this.game;
        Container.db = new GameStorage();
    }

    preload() {
        this.game.add.plugin(PhaserInput.Plugin as any);
    }

    create() {
        let args = this.game['args'] as GlobalArgs;
        for (var key in args) {
            if (args.hasOwnProperty(key)) {
                var arg: IManagedComponent = args[key];
                arg.release(this.game);
            }
        }

        let initFunc = this.game['inited'] as () => void;
        if (initFunc) {
            initFunc();
        }

        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    }

    render() {
        Container.debug.forEach(debug => debug());
    }

    inited: () => void;
}