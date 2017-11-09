define(["require", "exports", "../../globals/Constants", "../../globals/IoC"], function (require, exports, Constants_1, IoC_1) {
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
            var text = new Phaser.Text(IoC_1.Container.game, options.x || Constants_1.Constants.centerX, options.y || 0, options.text || "", fontStyle);
            if (options.boundsAlignH) {
                text.boundsAlignH = options.boundsAlignH;
            }
            if (options.boundsAlignV) {
                text.boundsAlignH = options.boundsAlignV;
            }
            if (options.autoinit) {
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                if (options.anchor == null) {
                    text.anchor.set(0.5);
                }
                else if (options.anchor != 0) {
                    text.anchor.set(options.anchor);
                }
                IoC_1.Container.game.add.existing(text);
            }
            return text;
        }
    }
    exports.TextFactory = TextFactory;
});
