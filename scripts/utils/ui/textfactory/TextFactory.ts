import { } from "../../../../node_modules/phaser-ce/typescript/phaser";
import { } from "./interfaces/ITextFactoryArgs";
import * as ioc from "../../globals/IoC";

export class TextFactory {
    static new(options: ITextFactoryArgs): Phaser.Text {
        var text = ioc.Container.game.make.text(
            options.x || ioc.Container.game.world.centerX,
            options.y || 0,
            options.text || "",
            options.fontStyle ||
            {
                font: `bold 12pt TheMinion`,
                fill: "#FFFFFF",
                align: 'center'
            }
        );

        if (options.autoinit) {
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            text.anchor.set(0.5);
            ioc.Container.game.add.existing(text);
        }

        return text;
    }
}