define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SimpleGame = /** @class */ (function () {
        function SimpleGame() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        }
        SimpleGame.prototype.preload = function () {
            var img = this.game.load.image('logo', 'images/environment/BG.png');
        };
        SimpleGame.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        };
        return SimpleGame;
    }());
    var game = new SimpleGame();
});
