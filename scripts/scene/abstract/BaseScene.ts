import { } from "../../app/core/interfaces/IManagedResource";
import { } from "../interfaces/IScene";
import { Container } from "../../utils/globals/IoC";

export abstract class BaseScene implements IScene {
    abstract name: string;
    abstract clear: boolean;
    run(): void {
        this.resources.forEach(resource => resource.release(Container.game));
    }

    protected abstract resources: IManagedResource[];
}