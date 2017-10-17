export class Container {
    static game: Phaser.Game

    static debug: Function[] = [];

    static initActions: (() => void)[] = [];

    static onInited(action: () => void) {
        this.initActions.push(action);
    }

    static init() {
        this.initActions.forEach(action => action());
        this.initActions = [];
    }

    static _cursor: Phaser.Sprite;
    static cursor(key: string, frame: string) {
        this._cursor.loadTexture(key, frame);
    }
}