define(["require", "exports", "../../utils/globals/IoC", "../../utils/globals/Constants"], function (require, exports, IoC_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Initialize container
     */
    class GlobalGame {
        constructor(args) {
            this.args = args;
        }
        run() {
            this.game = new Phaser.Game(Constants_1.Constants.gameWidth, Constants_1.Constants.gameHeight, Phaser.CANVAS, 'content', {
                preload: this.preload,
                create: this.create,
                render: this.render
            }, true, false);
            this.game['args'] = this.args;
            this.game['inited'] = this.inited;
            IoC_1.Container.game = this.game;
        }
        preload() {
            this.game.add.plugin(PhaserInput.Plugin);
        }
        create() {
            let args = this.game['args'];
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    var arg = args[key];
                    arg.release(this.game);
                }
            }
            let initFunc = this.game['inited'];
            if (initFunc) {
                initFunc();
            }
        }
        render() {
            //https://phaser.io/examples/v2/input/pointer-lock
            IoC_1.Container.debug.forEach(debug => debug());
            let x = (this.game.input.mouse.event || { movementX: 0 }).movementX;
            let y = (this.game.input.mouse.event || { movementY: 0 }).movementY;
            if (!IoC_1.Container._cursor) {
                IoC_1.Container._cursor = new Phaser.Sprite(this.game, x, y, "uifullmap", "cursorSword_silver");
            }
            IoC_1.Container._cursor.x += 300;
            IoC_1.Container._cursor.y += 300;
        }
    }
    exports.GlobalGame = GlobalGame;
});
