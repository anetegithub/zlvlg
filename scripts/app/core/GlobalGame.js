define(["require", "exports", "../../utils/globals/IoC", "../../utils/globals/Constants", "../../data/GameStorage"], function (require, exports, IoC_1, Constants_1, GameStorage_1) {
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
            this.game = new Phaser.Game(Constants_1.Constants.windowWidth, Constants_1.Constants.windowHeight, Phaser.CANVAS, 'content', {
                preload: this.preload,
                create: this.create,
                render: this.render
            }, true, false);
            this.game['args'] = this.args;
            this.game['inited'] = this.inited;
            IoC_1.Container.game = this.game;
            IoC_1.Container.db = new GameStorage_1.GameStorage();
            IoC_1.Container.db.init();
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
            this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        }
        render() {
            IoC_1.Container.debug.forEach(debug => debug());
        }
    }
    exports.GlobalGame = GlobalGame;
});
