define(["require", "exports", "../ui/impl/ZombieHand", "./menu"], function (require, exports, ZombieCursor, m) {
    "use strict";
    exports.__esModule = true;
    var SimpleGame = /** @class */ (function () {
        function SimpleGame(cursor) {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
            cursor.set(this.game);
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
        custom: {
            families: ['TheMinion'],
            urls: ['./styles/app.css']
        },
        active: function () {
            new SimpleGame(new ZombieCursor.ZombieHand());
        }
    });
});
