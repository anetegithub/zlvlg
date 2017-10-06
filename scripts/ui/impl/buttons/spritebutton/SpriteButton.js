define(["require", "exports", "../../text/ManagedText", "../../../../utils/globals/Constants", "../BaseButton"], function (require, exports, ManagedText_1, Constants_1, BaseButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteButton extends BaseButton_1.BaseButton {
        constructor(args) {
            super(args);
        }
        init(game) {
            var btn = new Phaser.Button(game, this.args.x, this.args.y, this.args.initSpriteKey);
            btn.onInputOver.add(() => {
                btn.loadTexture(this.args.overSpriteKey || this.args.initSpriteKey);
            });
            btn.onInputDown.add(() => {
                btn.loadTexture(this.args.pressSpriteKey || this.args.initSpriteKey);
            });
            btn.onInputOut.add(() => {
                btn.loadTexture(this.args.initSpriteKey);
            });
            if (this.args.events) {
                if (this.args.events.up) {
                    btn.onInputUp.add(this.args.events.up);
                }
            }
            return btn;
        }
        release(game) {
            super.release(game);
            new ManagedText_1.ManagedText({
                text: this.args.text,
                fontStyle: {
                    font: '18pt ' + Constants_1.Constants.fontFamily,
                    fill: '#ffffff'
                },
                y: this.args.y + 25,
                x: this.args.x + 25
            }).release(game);
        }
    }
    exports.SpriteButton = SpriteButton;
});
