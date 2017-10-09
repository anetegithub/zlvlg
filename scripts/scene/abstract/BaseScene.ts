import { } from "../../app/core/interfaces/IManagedResource";
import { } from "../interfaces/IScene";
import { Container } from "../../utils/globals/IoC";

export abstract class BaseScene implements IScene {
    abstract name: string;
    abstract clear: boolean;

    constructor() {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/cursor.png"), auto`;
    }

    run(): void {
        if (this.clear) {
            Container.game.world.removeAll(true, true);
        }

        if (this.resources) {
            var loader = new Phaser.Loader(Container.game);

            this.resources.forEach(res => {
                if (res.type) {
                    loader[res.type](res.key, res.url);
                } else {
                    loader.image(res.key, res.url);
                }
            });

            loader.onLoadComplete.addOnce(() => {
                this.releaseComponents();
            }, this);

            loader.start();
        }
        else {
            this.releaseComponents();
        }
    }

    private releaseComponents() {
        if (this.components) {
            this.components.forEach(this.releaseComponent);
        }
    }

    private releaseComponent(resource: IManagedComponent) {
        resource.release(Container.game);
    }

    protected abstract get components(): IManagedComponent[];
    protected abstract get resources(): ILoadedResource[];
}