import { } from "../../../app/core/interfaces/IManagedResource";
import { } from "../../../utils/ui/textfactory/interfaces/ITextFactoryArgs";
import { TextFactory } from "../../../utils/ui/textfactory/TextFactory";

export class ManagedText implements IManagedResource {

    constructor(params: ITextFactoryArgs) {
        this.textStyle = params;
    }

    textStyle: ITextFactoryArgs;

    release(game: Phaser.Game): void {
        this.textStyle.autoinit = true;
        var text = TextFactory.new(this.textStyle);
    }
}