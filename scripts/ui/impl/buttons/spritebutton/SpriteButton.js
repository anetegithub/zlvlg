define(["require", "exports", "../../../../utils/globals/Constants", "../BaseButton", "../../../../utils/ui/textfactory/TextFactory"], function (require, exports, Constants_1, BaseButton_1, TextFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteButton extends BaseButton_1.BaseButton {
        constructor(args) {
            super(args);
            this.args.events = args.events || {};
            this.args.events.up = args.events.up || function () { };
        }
        init(game) {
            if (!this.btn) {
                this.btn = new Phaser.Button(game, this.args.x, this.args.y, 'uifull', this.args.events.up, this.btn, this.args.initFrame, this.args.initFrame, this.args.pressedFrame);
            }
            return this.btn;
        }
        release(game) {
            super.release(game);
            let fontStyle = {
                font: (this.args.fontSize || 24) + 'pt ' + Constants_1.Constants.fontFamily,
                fill: '#ffffff'
            };
            let text = TextFactory_1.TextFactory.new({
                autoinit: false,
                fontStyle: fontStyle,
                text: this.args.text
            });
            text.y = this.args.y + ((this.btn.height - text.height) / 2);
            text.x = this.args.x + ((this.btn.width - text.width) / 2);
            this.btn.events.onInputOver.add(() => {
                var fxdStyle = Object.assign({}, fontStyle);
                fxdStyle.fill = Constants_1.Constants.color;
                text.setStyle(fxdStyle, true);
            });
            this.btn.events.onInputOut.add(() => {
                text.setStyle(fontStyle, true);
            });
            this.btn.events.onInputUp.add(() => {
                text.setStyle(fontStyle, true);
            });
            game.add.existing(text);
        }
    }
    exports.SpriteButton = SpriteButton;
});
