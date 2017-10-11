interface SpriteTile {
    filename: string;
    frame: Rectangle;
    rotated: boolean;
    trimmed: boolean;
    spriteSourceSize: Rectangle;
    sourceSize: Point;
}