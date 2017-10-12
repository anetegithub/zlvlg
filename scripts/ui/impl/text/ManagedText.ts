import { } from "../../../app/core/interfaces/IManagedResource";
import { } from "../../../utils/ui/textfactory/interfaces/ITextFactoryArgs";
import { TextFactory } from "../../../utils/ui/textfactory/TextFactory";

export class ManagedText implements IManagedComponent {

    constructor(params: ITextFactoryArgs) {
        this.textStyle = params;
    }

    textStyle: ITextFactoryArgs;
    text: Phaser.Text;

    release(game: Phaser.Game): void {
        this.textStyle.autoinit = true;
        this.text = TextFactory.new(this.textStyle);
    }
}