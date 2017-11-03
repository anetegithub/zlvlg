define(["require", "exports", "../../../../utils/ui/textfactory/TextFactory", "../BaseButton", "../../../../utils/globals/Constants"], function (require, exports, TextFactory_1, BaseButton_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextButton extends BaseButton_1.BaseButton {
        init(game) {
            if (!this._inited) {
                let fontStyle = {
                    font: `bold ${this.args.fontSize || 24}pt  ` + Constants_1.Constants.fontFamily,
                    fill: "#FFFFFF",
                    align: 'center'
                };
                if (!this.args.fontStyle) {
                    this.args.fontStyle = fontStyle;
                }
                var sprite = TextFactory_1.TextFactory.new({
                    fontStyle: this.args.fontStyle,
                    y: this.args.y,
                    x: this.args.x,
                    text: this.args.text,
                    autoinit: true
                });
                if (this.args.events) {
                    var args = this.args;
                    sprite.events.onInputOver.add(() => {
                        var fxdStyle = Object.assign({}, args.fontStyle);
                        fxdStyle.fill = Constants_1.Constants.color;
                        sprite.setStyle(fxdStyle, true);
                    });
                    sprite.events.onInputOut.add(() => {
                        sprite.setStyle(args.fontStyle, true);
                    });
                    sprite.events.onInputDown.add(() => {
                        var fxdStyle = Object.assign({}, args.fontStyle);
                        let fontSizeStr = fxdStyle.font.split(' ')[1];
                        let fontsize = parseInt(fontSizeStr
                            .replace('pt', ''));
                        fxdStyle.font = fxdStyle.font.replace(fontSizeStr, `${fontsize - 1}pt`);
                        fxdStyle.fill = Constants_1.Constants.color;
                        sprite.setStyle(fxdStyle, true);
                    });
                }
                this._inited = sprite;
            }
            return this._inited;
        }
    }
    exports.TextButton = TextButton;
});
