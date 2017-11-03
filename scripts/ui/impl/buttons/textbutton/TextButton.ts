import { } from "../../app/core/interfaces/IManagedResource";
import { TextFactory } from "../../../../utils/ui/textfactory/TextFactory";
import { BaseButton } from "../BaseButton";
import { Constants } from "../../../../utils/globals/Constants";

export class TextButton extends BaseButton<Phaser.Text> {
    private _inited: Phaser.Sprite;
    init(game: Phaser.Game): Phaser.Sprite {
        if (!this._inited) {
            let fontStyle = {
                font: `bold ${this.args.fontSize || 24}pt  ` + Constants.fontFamily,
                fill: "#FFFFFF",
                align: 'center'
            };

            if (!this.args.fontStyle) {
                this.args.fontStyle = fontStyle;
            }

            var sprite = TextFactory.new({
                fontStyle: this.args.fontStyle,
                y: this.args.y,
                x: this.args.x,
                text: this.args.text,
                autoinit: true
            });

            if (this.args.events) {
                var args = this.args;

                sprite.events.onInputOver.add(() => {
                    var fxdStyle = { ...args.fontStyle };
                    fxdStyle.fill = Constants.color;

                    sprite.setStyle(fxdStyle, true);
                });

                sprite.events.onInputOut.add(() => {
                    sprite.setStyle(args.fontStyle, true)
                });

                sprite.events.onInputDown.add(() => {
                    var fxdStyle = { ...args.fontStyle };

                    let fontSizeStr = fxdStyle.font.split(' ')[1];
                    let fontsize = parseInt(fontSizeStr
                        .replace('pt', ''));

                    fxdStyle.font = fxdStyle.font.replace(fontSizeStr, `${fontsize - 1}pt`);
                    fxdStyle.fill = Constants.color;
                    sprite.setStyle(fxdStyle, true);
                });
            }
            this._inited = sprite;
        }
        return this._inited;
    }
}