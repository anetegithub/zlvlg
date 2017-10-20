import { Container } from "../../../utils/globals/IoC";
import { Constants } from "../../../utils/globals/Constants";

export class MapGrid extends Phaser.Group {
    constructor() {
        super(Container.game);
        this.visible = false;

        for (let xCoordinate = Constants.mapOffset.x; xCoordinate <= Constants.mapWidth; xCoordinate += 32) {
            let graph = new Phaser.Graphics(Container.game, xCoordinate, Constants.mapOffset.y);
            graph.lineStyle(1, 0xd3d3d3, 1);
            graph.moveTo(xCoordinate, Constants.mapOffset.y);
            graph.lineTo(xCoordinate, Constants.mapHeight);
            let line = new Phaser.Sprite(Container.game, xCoordinate, Constants.mapOffset.y, graph.generateTexture());
            this.add(line);
        }

        for (let yCoordinate = Constants.mapOffset.y; yCoordinate <= Constants.mapHeight; yCoordinate += 32) {
            let graph = new Phaser.Graphics(Container.game, Constants.mapOffset.x, yCoordinate);
            graph.lineStyle(1, 0xd3d3d3, 1);
            graph.moveTo(Constants.mapOffset.x, yCoordinate);
            graph.lineTo(Constants.mapWidth - Constants.mapOffset.x, yCoordinate);
            let line = new Phaser.Sprite(Container.game, Constants.mapOffset.x, yCoordinate, graph.generateTexture());
            this.add(line);
        }
    }
}