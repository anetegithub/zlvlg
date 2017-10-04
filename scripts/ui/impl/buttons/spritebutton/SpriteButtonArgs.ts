import { } from "../../../interfaces/SpriteArgs";

export interface SpriteButtonArgs extends SpriteArgs {
    x: number;
    y: number; text: string;
    click: () => void;
}