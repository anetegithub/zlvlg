import { ISceneManager } from "../../scene/interfaces/ISceneManager";

export class Container {
    static game: Phaser.Game
    static sceneMgr: ISceneManager;

    static initActions: (() => void)[];

    static onInited(action: () => void) {
        this.initActions.push(action);
    }

    static init() {
        this.initActions.forEach(action => action());
        this.initActions = [];
    }
}