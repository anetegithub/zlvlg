import { } from "../../app/core/interfaces/IManagedResource";
import { } from "../interfaces/IScene";
import { Container } from "../../utils/globals/IoC";

export abstract class BaseScene implements IScene {
    abstract name: string;
    abstract clear: boolean;

    run(): void {
        if (this.clear) {
            Container.game.world.removeAll(true, true);
        }

        if (this.loaderRes) {
            var loader = new Phaser.Loader(Container.game);

            this.loaderRes.forEach(res => {
                if (res.type) {
                    loader[res.type](res.key, res.url);
                } else {
                    loader.image(res.key, res.url);
                }
            });

            loader.onLoadComplete.addOnce(() => {
                this.releaseManagedRes();
            }, this);

            loader.start();
        }
        else {
            this.releaseManagedRes();
        }
    }

    private releaseManagedRes() {
        if (this.resources) {
            this.resources.forEach(resource => resource.release(Container.game));
        }
    }

    protected abstract resources: IManagedResource[];
    protected abstract loaderRes: { key: string, url: string, type?: string }[];
}