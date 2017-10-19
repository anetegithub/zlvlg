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

    static windowWidth: number = 800;
    static windowHeight: number = 784;

    static playWidth: number = 796;
    static playHeight: number = 600;

    static mapWidth: number = 768;
    static get mapHeight(): number {
        return Constants.playHeight - Constants.barHeight;
    }

    static barHeight: number = 16;

    static mapOffset = {
        get x(): number {
            return (Constants.windowWidth - Constants.mapWidth) / 2;
        },
        y: 104
    }

    static gameWindowOffset = {
        x: 16,
        y: 2
    };
}