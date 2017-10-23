import { Container } from "../../../utils/globals/IoC";
import { Constants } from "../../../utils/globals/Constants";
import { Map } from "./Map";

export class MapGrid {
    private dotMap: Array<{ x: number, y: number }> = [];
    sprite: Phaser.Sprite;

    constructor() {
        let group = new Phaser.Group(Container.game);
        group.visible = false;

        for (let xCoordinate = Constants.mapOffset.x; xCoordinate <= Constants.mapWidth; xCoordinate += 32) {
            let graph = new Phaser.Graphics(Container.game, xCoordinate, Constants.mapOffset.y);
            this.dotMap.push({
                x: xCoordinate,
                y: Constants.mapOffset.y
            });
            graph.lineStyle(1, 0xd3d3d3, 1);
            graph.moveTo(xCoordinate, Constants.mapOffset.y);
            graph.lineTo(xCoordinate, Constants.mapHeight);
            let line = new Phaser.Sprite(Container.game, xCoordinate, Constants.mapOffset.y, graph.generateTexture());
            group.add(line);
        }

        for (let yCoordinate = Constants.mapOffset.y; yCoordinate <= Constants.mapHeight; yCoordinate += 32) {
            let graph = new Phaser.Graphics(Container.game, Constants.mapOffset.x, yCoordinate);
            this.dotMap.push({
                x: Constants.mapOffset.x,
                y: yCoordinate
            });
            graph.lineStyle(1, 0xd3d3d3, 1);
            graph.moveTo(Constants.mapOffset.x, yCoordinate);
            graph.lineTo(Constants.mapWidth - Constants.mapOffset.x, yCoordinate);
            let line = new Phaser.Sprite(Container.game, Constants.mapOffset.x, yCoordinate, graph.generateTexture());
            group.add(line);
        }

        group.visible = true;
        this.sprite = new Phaser.Sprite(Container.game, Constants.mapOffset.x, Constants.mapOffset.y, group.generateTexture());
        this.sprite.inputEnabled = true;
        this.sprite.visible = false;
        group.destroy(true);
    }

    map: Map;

    setSprite(sprite: Phaser.Sprite) {
        let x = this.getPoint(Container.game.input.mouse.event.layerX);
        let y = this.getPoint(Container.game.input.mouse.event.layerY)

        console.log(Container.game.input.mouse.event.layerX);
        console.log(Math.floor(Container.game.input.mouse.event.layerX / 32));

        let spriteInMap = new Phaser.Sprite(Container.game, x - Constants.mapOffset.x, y, sprite.generateTexture());
        spriteInMap.scale.x = 2;
        spriteInMap.scale.y = 2;
        Container.game.add.existing(spriteInMap);
    }

    private getPoint(num: number) {
        let decimal = Math.ceil(((num < 1.0) ? num : (num % Math.floor(num))) * 10000);
        if (decimal > 0.5)
            return Math.floor(num / 32) * 32;
        else
            return Math.round(num / 32) * 32;

    }
}