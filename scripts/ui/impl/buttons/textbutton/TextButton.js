define(["require", "exports", "../../../../utils/ui/textfactory/TextFactory", "../BaseButton"], function (require, exports, TextFactory_1, BaseButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextButton extends BaseButton_1.BaseButton {
        init(game) {
            return TextFactory_1.TextFactory.new({
                fontStyle: this.args.fontStyle,
                y: this.args.y,
                text: this.args.text,
                autoinit: true
            });
        }
    }
    exports.TextButton = TextButton;
});
