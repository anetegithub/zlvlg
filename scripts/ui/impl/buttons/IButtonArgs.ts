interface IButtonArgs<T extends PIXI.Sprite> {
    x?: number;
    y?: number;
    text?: string;
    fontStyle?: Phaser.PhaserTextStyle,
    fontSize?: number,
    events?: IMouseEvents<T>
}