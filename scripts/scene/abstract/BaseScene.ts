import { } from "../../app/core/interfaces/IManagedResource";
import { } from "../interfaces/IScene";
import { Container } from "../../utils/globals/IoC";

export abstract class BaseScene implements IScene {
    abstract clear: boolean;

    constructor() {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/cursor.png"), auto`;
    }

    async run(): Promise<void> {
        if (this.clear) {
            Container.game.world.removeAll(true, true);
        }

        if (this.resources) {
            let resources = await this.resources();
            var loader = new Phaser.Loader(Container.game);
            resources.forEach(res => {
                if (res.type) {
                    loader[res.type](res.key, res.url, ...(res.args || []));
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

    private async releaseComponents() {
        if (this.components) {
            let components = await this.components();
            components.forEach(this.releaseComponent);
        }
    }

    private releaseComponent(resource: IManagedComponent) {
        resource.release(Container.game);
    }

    protected abstract components(): Promise<IManagedComponent[]>;
    protected abstract resources(): Promise<ILoadedResource[]>;
}