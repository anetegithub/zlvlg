import { ManagedComponent } from "../../app/core/impl/ManagedComponent";
import { Event } from "../../utils/struct/Event";

export class Block extends ManagedComponent {
    tile: string;

    source: IGameObject;

    passable: {
        s: boolean,
        n: boolean,
        e: boolean,
        w: boolean
    };

    events: {
        onClick: Event<Block, Date>,
        onEvnter: Event<Block, Date>,
        onLeave: Event<Block, Date>
    }
}