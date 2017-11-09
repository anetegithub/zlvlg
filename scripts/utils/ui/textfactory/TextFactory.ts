import { } from "../../../../node_modules/phaser-ce/typescript/phaser";
import { } from "./interfaces/ITextFactoryArgs";
import { Constants } from "../../globals/Constants";
import { Container } from "../../globals/IoC";

export class TextFactory {
    static new(options: ITextFactoryArgs): Phaser.Text {
        let fontStyle = options.fontStyle ||
            {
                font: `bold ${options.fontSize || 12}pt ` + Constants.fontFamily,
                fill: "#FFFFFF",
                align: 'center'
            };

        var text = new Phaser.Text(Container.game,
            options.x || Constants.centerX,
            options.y || 0,
            options.text || "",
            fontStyle
        );

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
            Container.game.add.existing(text);
        }

        return text;
    }
}