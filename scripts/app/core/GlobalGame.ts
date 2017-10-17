import { } from "../../../node_modules/phaser-ce/typescript/phaser";
import { } from "../../../node_modules/@orange-games/phaser-input/build/phaser-input";
import { GlobalArgs } from "./GlobalArgs";
import { Container } from "../../utils/globals/IoC";
import { Constants } from "../../utils/globals/Constants";

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
        this.game = new Phaser.Game(Constants.gameWidth, Constants.gameHeight, Phaser.CANVAS, 'content', {
            preload: this.preload,
            create: this.create,
            render: this.render
        }, true, false);



        this.game['args'] = this.args;
        this.game['inited'] = this.inited;
        Container.game = this.game;
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
    }

    render() {
        //https://phaser.io/examples/v2/input/pointer-lock
        Container.debug.forEach(debug => debug());
        let x = (this.game.input.mouse.event || { movementX: 0 }).movementX;
        let y = (this.game.input.mouse.event || { movementY: 0 }).movementY;

        if (!Container._cursor) {
            Container._cursor = new Phaser.Sprite(this.game,
                x,
                y,
                "uifullmap",
                "cursorSword_silver");
        }
        Container._cursor.x += 300;
        Container._cursor.y += 300;
    }

    inited: () => void;
}