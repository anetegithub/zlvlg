import { } from "../../../interfaces/IMouseEvents";
export interface TextButtonArgs {
    size?: number;
    y?: number;
    text?: string;
    color?: string;
    events?: IMouseEvents<Phaser.Text>
}