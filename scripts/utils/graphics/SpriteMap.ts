export class SpriteMap {
    static create(json: any): SpriteMap {
        var spMap = new SpriteMap();
        spMap.frames = json.frames;
        return spMap;
    }

    private frames: SpriteTile[];

    getSpriteSection(section: keyof SpriteTypes) {
        return this.filterByIncludes(new SpriteTypes()[section]);
    }

    private filterByIncludes(char: string) {
        return this.frames.filter(x => x.filename.includes(char));
    }
}

export class SpriteTypes {
    walls = '#';
    floors = '_';
    enemy = '^';
    decore = '*';
    floorobjects = '&';
    matery = '=';
    items = '.';
    weapons = 'W';
    people = '@';
}

