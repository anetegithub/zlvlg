export class SpriteMap {
    static create(json: any): SpriteMap {
        var spMap = new SpriteMap();
        spMap.frames = json.frames;
        return spMap;
    }

    frames: SpriteTile[];

    walls(): SpriteTile[] {
        return this.filterByIncludes('|');
    }

    floors(): SpriteTile[] {
        return this.filterByIncludes('-');
    }

    decorations(): SpriteTile[] {
        return this.filterByIncludes('@');
    }

    items(): SpriteTile[] {
        return this.filterByIncludes('^')
            .concat(this.filterByIncludes('='));
    }

    private filterByIncludes(char: string) {
        return this.frames.filter(x => x.filename.includes(char));
    }
}