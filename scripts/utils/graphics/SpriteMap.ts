export class SpriteMap {
    static create(json: any): SpriteMap {
        var spMap = new SpriteMap();
        spMap.frames = json.frames;
        return spMap;
    }

    frames: SpriteTile[];

    walls(): SpriteTile[] {
        return this.frames.filter(x => x.filename.includes("|") && x.frame.w != 32);
    }

    floors(): SpriteTile[] {
        return this.frames.filter(x => x.filename.includes("-"));
    }
}