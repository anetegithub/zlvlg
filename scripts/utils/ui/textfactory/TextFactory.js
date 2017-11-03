define(["require", "exports", "../../globals/IoC", "../../globals/Constants"], function (require, exports, ioc, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextFactory {
        static new(options) {
            let fontStyle = options.fontStyle ||
                {
                    font: `bold ${options.fontSize || 12}pt ` + Constants_1.Constants.fontFamily,
                    fill: "#FFFFFF",
                    align: 'center'
                };
            var text = ioc.Container.game.make.text(options.x || ioc.Container.game.world.centerX, options.y || 0, options.text || "", fontStyle);
            if (options.autoinit) {
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                text.anchor.set(0.5);
                ioc.Container.game.add.existing(text);
            }
            return text;
        }
    }
    exports.TextFactory = TextFactory;
});
