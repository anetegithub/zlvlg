import { } from "../../../interfaces/IMouseEvents";
export interface TextButtonArgs {
    y?: number;
    text?: string;
    fontStyle?: Phaser.PhaserTextStyle,
    events?: IMouseEvents<Phaser.Text>
}