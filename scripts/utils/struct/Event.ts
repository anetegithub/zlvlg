import { Delegate } from "./Delegate";

export class Event<T, IEventArgs> {
    delegates: Delegate<T>[] = [];
    add(delegate: Delegate<T>) {
        this.delegates.push(delegate);
    }

    remove(delegate: Delegate<T>) {
        this.delegates = this.delegates.slice(this.delegates.indexOf(delegate), 1);
    }

    fire(sender: T, args: IEventArgs) {
        this.delegates.forEach(delegate => delegate.call(sender, args));
    }

}