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

        if (this.loades) {
            var loader = new Phaser.Loader(Container.game);

            this.loades.forEach(res => {
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
            this.resources.forEach(this.releaseResource);
        }
    }

    private releaseResource(resource: IManagedResource) {
        resource.release(Container.game);
    }

    protected addComponents(res: IManagedResource[]) {
        if (!this.resources) {
            this.resources = [];
        }
        this.resources.push(...res);
    }

    protected load(res: { key: string, url: string, type?: string }[]) {
        if (!this.loades) {
            this.loades = [];
        }
        this.loades.push(...res);
    }

    private resources: IManagedResource[];
    private loades: { key: string, url: string, type?: string }[];
}