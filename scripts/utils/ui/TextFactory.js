define(["require", "exports", "../globals/IoC"], function (require, exports, ioc) {
    "use strict";
    exports.__esModule = true;
    var TextFactory = /** @class */ (function () {
        function TextFactory() {
        }
        TextFactory["new"] = function (options) {
            var text = ioc.Container.game.make.text(ioc.Container.game.world.centerX, options.y || 0, options.text || "", {
                font: "bold " + (options.size || 12) + "pt TheMinion",
                fill: options.color || "#FFFFFF",
                align: 'center'
            });
            if (options.autoinit) {
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                text.anchor.set(0.5);
                ioc.Container.game.add.existing(text);
            }
            return text;
        };
        return TextFactory;
    }());
    exports.TextFactory = TextFactory;
});
