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
            IoC_1.Container.debug.forEach(debug => debug());
        }
    }
    exports.GlobalGame = GlobalGame;
});
