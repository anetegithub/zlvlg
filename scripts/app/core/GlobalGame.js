define(["require", "exports", "../../utils/globals/IoC", "../../scene/scenes/MainMenuScene"], function (require, exports, IoC_1, MainMenuScene_1) {
    "use strict";
    exports.__esModule = true;
    /**
     * Initialize container
     */
    var GlobalGame = /** @class */ (function () {
        function GlobalGame(args) {
            this.args = args;
            IoC_1.Container.sceneMgr = args.sceneMgr;
        }
        GlobalGame.prototype.run = function () {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
            this.game['args'] = this.args;
            IoC_1.Container.game = this.game;
        };
        GlobalGame.prototype.preload = function () {
            this.game.load.image('logo', 'images/environment/BG0.png');
        };
        GlobalGame.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            var args = this.game['args'];
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    var arg = args[key];
                    arg.release(this.game);
                }
            }
            this.startTheGame();
        };
        GlobalGame.prototype.startTheGame = function () {
            IoC_1.Container.sceneMgr.add(new MainMenuScene_1.MainMenuScene());
            IoC_1.Container.sceneMgr.next("MainMenu");
        };
        return GlobalGame;
    }());
    exports.GlobalGame = GlobalGame;
});
