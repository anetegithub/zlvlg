import { GameStorage } from "../../data/GameStorage";

export class Container {
    static game: Phaser.Game

    static db: GameStorage;

    static debug: Function[] = [];

    static initActions: (() => void)[] = [];

    static onInited(action: () => void) {
        this.initActions.push(action);
    }

    static init() {
        this.initActions.forEach(action => action());
        this.initActions = [];
    }

    static setCursor(key: keyof { cursor, hand, point }) {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/${key}.png"), auto`;
    }
}