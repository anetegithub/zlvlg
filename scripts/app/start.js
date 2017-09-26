define(["require", "exports", "./menu"], function (require, exports, m) {
    "use strict";
    exports.__esModule = true;
    var SimpleGame = /** @class */ (function () {
        function SimpleGame() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        }
        SimpleGame.prototype.preload = function () {
            this.game.load.image('logo', 'images/environment/BG0.png');
        };
        SimpleGame.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            new m.MainMenu(this.game);
        };
        return SimpleGame;
    }());
    WebFont.load({
        active: function () {
            new SimpleGame();
        }
    });
});
