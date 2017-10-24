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
        let x = this.getPointX(Container.game.input.mouse.event.layerX);
        let y = this.getPointY(Container.game.input.mouse.event.layerY)

        console.log(Container.game.input.mouse.event.layerX);
        console.log(Math.floor(Container.game.input.mouse.event.layerX / 32));

        let spriteInMap = new Phaser.Sprite(Container.game, x - Constants.mapOffset.x + 1, y + 9, sprite.generateTexture());
        spriteInMap.scale.x = 2;
        spriteInMap.scale.y = 2;
        Container.game.add.existing(spriteInMap);
    }

    private getPointX(num: number) {
        let decimalNum = num / 32;
        let numParts = this.getDecimalPair(decimalNum);
        return (numParts.int + (numParts.decimal > 0.5 ? 1 : 0)) * 32;
    }
    private getPointY(num: number) {
        let decimalNum = num / 32;
        let numParts = this.getDecimalPair(decimalNum);
        if (numParts.decimal < 0.2) {
            numParts.int -= 1;
        }
        return numParts.int * 32;
    }

    private getDecimalPair(num: number): {
        int: number,
        decimal: number
    } {
        let parts = num.toString().split('.');
        return {
            int: parseInt(parts[0]),
            decimal: parseFloat(`0.${parts[1]}`)
        };
    }
}