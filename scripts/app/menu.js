define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MainMenu = /** @class */ (function () {
        function MainMenu(game) {
            this.titleText = game.make.text(game.world.centerX, 100, " Zombie\nGraveyards", {
                font: 'bold 42pt TheMinion',
                fill: '#45ea3f',
                align: 'center'
            });
            this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            this.titleText.anchor.set(0.5);
            game.add.existing(this.titleText);
        }
        return MainMenu;
    }());
    exports.MainMenu = MainMenu;
});
