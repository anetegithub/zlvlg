define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var GlobalGame = /** @class */ (function () {
        function GlobalGame(args) {
            this.args = args;
        }
        GlobalGame.prototype.run = function () {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        };
        GlobalGame.prototype.preload = function () {
            this.game.load.image('logo', 'images/environment/BG0.png');
        };
        GlobalGame.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            for (var key in this.args) {
                if (this.args.hasOwnProperty(key)) {
                    var arg = this.args[key];
                    arg.release(this.game);
                }
            }
        };
        return GlobalGame;
    }());
    exports.GlobalGame = GlobalGame;
});
