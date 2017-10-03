import { } from "../interfaces/IManagedResource";

export class ManagedResource implements IManagedResource {

    constructor(release: (game: Phaser.Game) => void) {
        this.init = release;
    }

    init: (game: Phaser.Game) => void;

    release(game: Phaser.Game): void {
        if (!this.init) {
            throw new Error("Custom managed resource is not implemented.");
        }

        this.init(game);
    }
}