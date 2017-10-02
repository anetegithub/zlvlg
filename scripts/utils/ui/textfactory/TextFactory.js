define(["require", "exports", "../../globals/IoC"], function (require, exports, ioc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextFactory {
        static new(options) {
            var text = ioc.Container.game.make.text(ioc.Container.game.world.centerX, options.y || 0, options.text || "", options.fontStyle ||
                {
                    font: `bold 12pt TheMinion`,
                    fill: "#FFFFFF",
                    align: 'center'
                });
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
