define(["require", "exports", "../../text/ManagedText", "../../../../utils/globals/Constants"], function (require, exports, ManagedText_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteButton {
        constructor(args) {
            this.args = args;
        }
        release(game) {
            var btn = new Phaser.Button(game, this.args.x, this.args.y, this.args.initSpriteKey);
            btn.onInputOver.add(() => {
                btn.loadTexture(this.args.overSpriteKey);
            });
            btn.onInputDown.add(() => {
                btn.loadTexture(this.args.pressSpriteKey);
            });
            btn.onInputOut.add(() => {
                btn.loadTexture(this.args.initSpriteKey);
            });
            btn.onInputUp.add(() => {
                this.args.click();
            });
            game.add.existing(btn);
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
