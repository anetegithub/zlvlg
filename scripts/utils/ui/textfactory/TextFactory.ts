import { } from "../../../../node_modules/phaser-ce/typescript/phaser";
import { } from "./interfaces/ITextFactoryArgs";
import * as ioc from "../../globals/IoC";
import { Constants } from "../../globals/Constants";

export class TextFactory {
    static new(options: ITextFactoryArgs): Phaser.Text {
        let fontStyle = options.fontStyle ||
            {
                font: `bold ${options.fontSize || 12}pt ` + Constants.fontFamily,
                fill: "#FFFFFF",
                align: 'center'
            };

        var text = ioc.Container.game.make.text(
            options.x || ioc.Container.game.world.centerX,
            options.y || 0,
            options.text || "",
            fontStyle
        );

        if (options.autoinit) {
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            text.anchor.set(0.5);
            ioc.Container.game.add.existing(text);
        }

        return text;
    }
}