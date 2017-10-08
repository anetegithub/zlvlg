import { Container } from "./IoC";

export class Constants {
    static color: string = '#1eb79b';
    static fontFamily: string = 'Ringbear';
    static get centerX(): number {
        return Container.game.world.centerX;
    }
    static get centerY(): number {
        return Container.game.world.centerY - (300 / 2);
    }
}